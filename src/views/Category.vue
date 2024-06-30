<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:24:24
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-30 15:49:20
 * @FilePath: Category.vue
 * @Description: For learning only
-->
<script setup>
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
const onSearch = (value) => {
  // TODO: 根据搜索关键字得到对应分类
  console.log(value)
  search.value = ''
}

// 侧边栏逻辑
const active = ref(0)
// TODO:根据后端返回的数据渲染侧边栏
const categoryMap = {
  0: ['川菜', '湘菜', '粤菜', '鲁菜', '苏菜', '浙菜', '闽菜', '徽菜'],
  1: ['肉类', '蔬菜', '水产', '主食', '汤粥', '小吃', '饮品', '烘焙']
}
watchEffect(() => {
  // TODO: 根据路由参数渲染不同的侧边栏数据
  console.log(route.query)
})
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
// TODO: 根据后端返回的数据渲染食谱列表
const recipes = ref([
  {
    id: 1,
    name: '麻婆豆腐',
    img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 2,
    name: '红烧肉',
    img: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 3,
    name: '鱼香肉丝',
    img: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 4,
    name: '宫保鸡丁',
    img: 'https://img.yzcdn.cn/vant/apple-4.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 5,
    name: '酸菜鱼',
    img: 'https://img.yzcdn.cn/vant/apple-5.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 6,
    name: '红烧鱼',
    img: 'https://img.yzcdn.cn/vant/apple-6.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 7,
    name: '红烧排骨',
    img: 'https://img.yzcdn.cn/vant/apple-7.jpg',
    view: 1000,
    like: 100
  },
  {
    id: 8,
    name: '红烧鸡块',
    img: 'https://img.yzcdn.cn/vant/apple-8.jpg',
    view: 1000,
    like: 100
  }
])
/**
 * @description: 查看菜谱详情
 * @param {*} id 菜谱id
 * @return {*}
 * @example: 例子
 */
const goDetail = (id) => {
  router.push(`/cookDetail/${id}`)
}
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
    <div class="content">
      <div class="aside">
        <van-sidebar v-model="active">
          <van-sidebar-item
            v-for="(item, index) in categoryMap[route.query.category || 1]"
            :key="index"
            :title="item"
            :to="`/category?category=${route.query.category || 1}&${
              route.query.category === '0' ? 'cuisine' : 'ingredient'
            }=${item}`"
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
          <van-grid :column-num="3">
            <van-grid-item
              v-for="item in recipes"
              :key="item.id"
              @click="goDetail(item.id)"
            >
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="item.img"
              ></van-image>
              <div>{{ item.name }}</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .content {
    height: calc(100vh - 155px);
    display: flex;
    .rightSide {
      width: 100%;
      padding: 10px;
      .list {
        margin-top: 10px;
      }
    }
  }
}
</style>
