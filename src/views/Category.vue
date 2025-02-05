<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:24:24
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 11:37:38
 * @FilePath: Category.vue
 * @Description: For learning only
-->
<script setup>
import {
  categoryByCuisineService,
  categoryByKindService,
  categorySearchService
} from '@/apis/category'
import { homeCuisineService, homeIngredientService } from '@/apis/home'
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'CategoryPage'
})

const route = useRoute()
const router = useRouter()

// 搜索逻辑
const search = ref('')
const showSearch = ref(false)
const searchList = ref([])
const onSearch = async (value) => {
  const res = await categorySearchService(value)
  searchList.value = res.data
  search.value = ''
  showSearch.value = true
}
const backToCategory = () => {
  showSearch.value = false
  searchList.value = []
}

// 侧边栏逻辑
const active = ref(0)
const categoryMap = ref({
  0: [],
  1: []
})
/**
 * @description: 获取侧边栏-菜系
 * @return {*}
 * @example: 例子
 */
const getCuisineSide = async () => {
  const res = await homeCuisineService()
  categoryMap.value[0] = res.data
}
const getIngredientSide = async () => {
  const res = await homeIngredientService()
  categoryMap.value[1] = res.data
}

/**
 * @description: 切换分类状态
 * @return {*}
 * @example: 例子
 */
const switchCategory = () => {
  const category = route.query.category === '0' ? '1' : '0'
  active.value = 0
  router.push({ query: { category } })
}

// 右侧食谱列表逻辑
const recipes = ref([])
/**
 * @description: 根据菜系id获取菜谱
 * @param {*} id 菜系id
 * @return {*}
 * @example: 例子
 */
const getRecipesByCuisineId = async (id) => {
  const res = await categoryByCuisineService(id)
  recipes.value = res.data
}
/**
 * @description: 根据食材id获取菜谱
 * @param {*} id 食材id
 * @return {*}
 * @example: 例子
 */
const getRecipesByIngredientId = async (id) => {
  const res = await categoryByKindService(id)
  recipes.value = res.data
}
/**
 * @description: 查看菜谱详情
 * @param {*} id 菜谱id
 * @return {*}
 * @example: 例子
 */
const goDetail = (id) => {
  router.push(`/cookDetail/${id}`)
}

watchEffect(() => {
  showSearch.value = searchList.value.length > 0
  const type = route.query.category || '1'
  const cuisineId = route.query.cuisine || '1'
  const ingredientId = route.query.ingredient || '1'
  if (type === '0') {
    getCuisineSide()
    cuisineId && getRecipesByCuisineId(cuisineId)
    active.value = Number(cuisineId) - 1
  } else {
    getIngredientSide()
    ingredientId && getRecipesByIngredientId(ingredientId)
    active.value = Number(ingredientId) - 1
  }
})
</script>
<template>
  <div class="container">
    <van-nav-bar title="Category"></van-nav-bar>
    <van-search
      v-model="search"
      shape="round"
      input-align="center"
      placeholder="请输入搜索相关菜谱"
      @search="onSearch"
    />
    <img style="width: 100%" src="@/assets/category_header.png" />
    <div class="content" v-show="!showSearch">
      <div class="aside">
        <van-sidebar v-model="active">
          <van-sidebar-item
            v-for="item in categoryMap[route.query.category || 1]"
            :key="item"
            :title="item.name"
            :to="`/category?category=${route.query.category || '1'}&${
              route.query.category === '0' ? 'cuisine' : 'ingredient'
            }=${item.cuisineId || item.kindId}`"
          />
        </van-sidebar>
      </div>
      <div class="rightSide">
        <van-button block plain hairline @click="switchCategory">
          切换为：
          <b style="color: var(--van-button-primary-background)">
            {{ route.query.category === '0' ? '食材分类' : '菜系分类' }}
          </b>
        </van-button>
        <div class="list">
          <van-grid
            :column-num="3"
            style="padding-bottom: 75px"
            square
            clickable
          >
            <van-grid-item
              v-for="item in recipes"
              :key="item"
              @click="goDetail(item.recipeId)"
            >
              <van-image
                width="100%"
                height="15vw"
                fit="cover"
                :src="`http://localhost:9090${item.img}`"
              ></van-image>
              <!-- <van-text-ellipsis :content="item.name" /> -->
              <div>{{ item.name }}</div>
            </van-grid-item>
          </van-grid>
          <van-back-top bottom="20vw" />
        </div>
      </div>
    </div>
    <div class="searchContent" v-show="showSearch">
      <van-button block plain hairline @click="backToCategory"
        >返回查看分类</van-button
      >
      <div class="searchList">
        <van-list>
          <van-cell
            v-for="item in searchList"
            :key="item"
            :title="item.name"
            :label="item.description"
            is-link
            @click="goDetail(item.recipeId)"
          >
            <template #icon>
              <van-image
                width="25vw"
                height="25vw"
                fit="cover"
                :src="`http://localhost:9090${item.img}`"
              />
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .content {
    height: calc(100vh - 240px);
    display: flex;
    .aside {
      width: 30%;
      .van-sidebar {
        height: 100%;
        overflow-y: auto;
      }
    }
    .rightSide {
      width: 100%;
      padding: 5px;
      .list {
        height: 100%;
        overflow-y: auto;
        margin-top: 10px;
      }
    }
  }
  .searchContent {
    height: calc(100vh - 190px);
    overflow-y: hidden;
    .searchList {
      height: calc(100vh - 290px);
      padding: 10px;
      overflow-y: auto;
      :deep .van-cell__title {
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>
