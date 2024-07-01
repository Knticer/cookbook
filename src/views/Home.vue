<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:23:30
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 16:17:37
 * @FilePath: Home.vue
 * @Description: For learning only
-->
<script setup>
import { useAvatar } from '@/hooks/useAvatar'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'HomePage'
})

const userStore = useUserStore()
const router = useRouter()
const { avatarImg } = useAvatar(userStore)

// TODO:从后端获取本周流行菜谱
const popCook = ref([
  {
    id: 1,
    name: 'Tomato',
    img: 'https://img.yzcdn.cn/vant/apple-1.jpg'
  },
  {
    id: 2,
    name: 'Apple',
    img: 'https://img.yzcdn.cn/vant/apple-2.jpg'
  },
  {
    id: 3,
    name: 'Banana',
    img: 'https://img.yzcdn.cn/vant/apple-3.jpg'
  },
  {
    id: 4,
    name: 'Orange',
    img: 'https://img.yzcdn.cn/vant/apple-4.jpg'
  }
])
// TODO:从后端获取菜系推荐
const cuisine = ref([
  '川菜',
  '粤菜',
  '湘菜',
  '鲁菜',
  '徽菜',
  '浙菜',
  '苏菜',
  '闽菜'
])
// TODO:从后端获取热门排行榜
const hotList = ref([
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
 * @description: 去菜谱分类页
 * @param {*} cuisine 菜系
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
      <van-swipe-item v-for="item in popCook" :key="item.id">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="item.img"
        ></van-image>
      </van-swipe-item>
    </van-swipe>

    <p class="title">菜系推荐</p>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="item in cuisine"
        :key="item"
        :text="item"
        @click="goCategory(item)"
      />
    </van-grid>

    <p class="title">热门排行榜</p>
    <van-grid square clickable :column-num="2" style="padding-bottom: 75px">
      <van-grid-item
        v-for="item in hotList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <van-image
          width="100%"
          height="25vw"
          fit="cover"
          :src="item.img"
        ></van-image>
        <div>{{ item.name }}</div>
        <div>浏览量: {{ item.view }}</div>
        <div>点赞量: {{ item.like }}</div>
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
