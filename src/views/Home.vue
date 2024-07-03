<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:23:30
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 10:38:43
 * @FilePath: Home.vue
 * @Description: For learning only
-->
<script setup>
import { homeCuisineService, homeGetHotService } from '@/apis/home'
import { useAvatar } from '@/hooks/useAvatar'
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'HomePage'
})

const userStore = useUserStore()
const router = useRouter()
const { avatarImg } = useAvatar(userStore)

// 菜系相关
const cuisine = ref([])
const getCuisine = async () => {
  const res = await homeCuisineService()
  cuisine.value = res.data
}
// 热门推荐
const hotList = ref([])
const getHot = async () => {
  const res = await homeGetHotService()
  hotList.value = res.data
}

onMounted(() => {
  getCuisine()
  getHot()
})

/**
 * @description: 去菜谱分类页
 * @param {*} cuisine 菜系id
 * @return {*}
 * @example: 例子
 */
const goCategory = (cuisine) => {
  router.push({
    path: '/category',
    query: {
      category: '0',
      cuisine
    }
  })
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
</script>
<template>
  <div class="container">
    <div class="header">
      <p class="head">Recipe</p>
      <van-image
        width="15vw"
        height="15vw"
        fit="cover"
        round
        :src="avatarImg"
        @click="$router.push('/about')"
      >
        <template #loading>
          <van-loading />
        </template>
        <template #error><van-icon name="user-o" size="30" /></template>
      </van-image>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in cuisine" :key="item.cuisineId">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="`http://localhost:9090${item.img}`"
        ></van-image>
      </van-swipe-item>
    </van-swipe>
    <p class="title">菜系推荐</p>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="item in cuisine"
        :key="item.cuisineId"
        :text="item.name"
        @click="goCategory(item.cuisineId)"
      />
    </van-grid>
    <p class="title">热门菜谱排行榜</p>
    <van-grid square clickable :column-num="2" style="padding-bottom: 75px">
      <van-grid-item
        v-for="item in hotList"
        :key="item.recipeId"
        @click="goDetail(item.recipeId)"
      >
        <van-image
          width="100%"
          height="25vw"
          fit="cover"
          :src="`http://localhost:9090${item.img}`"
        ></van-image>
        <!-- <van-text-ellipsis :content="item.name" /> -->
        <h3>{{ item.name }}</h3>
        <div>浏览量: {{ item.views }}</div>
        <div>收藏量: {{ item.collects }}</div>
      </van-grid-item>
    </van-grid>
    <van-back-top bottom="20vw" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .head {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 2.5em;
      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 65px;
    }
    .van-image {
      position: absolute;
      top: 20px;
      right: 20px;
      &.van-image--round {
        border: 1px rgba(100, 100, 100, 0.1) solid;
      }
    }
  }
  .van-swipe {
    height: 200px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #39a9ed;
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    backdrop-filter: blur(10px);
    text-align: center;
  }
}
</style>
