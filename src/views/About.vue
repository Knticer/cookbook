<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:26:06
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 17:04:15
 * @FilePath: About.vue
 * @Description: For learning only
-->
<script setup>
import { useAvatar } from '@/hooks/useAvatar'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { showImagePreview } from 'vant'
import DiyPop from './components/DiyPop.vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AboutPage'
})

const router = useRouter()

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { avatarImg } = useAvatar(userStore)
const showPopover = ref(false)
const genderMap = new Map([
  [0, '不愿透露'],
  [1, '男'],
  [2, '女']
])

const usersInfo = {
  username: 'chenxin',
  gender: 1,
  introduction: '这是一个有趣的人',
  // TODO:这里先写死
  taste: '酸,甜,苦,辣,咸'
}

// 标签栏相关
// TODO:模拟数据
const active = ref(0)
const likeList = ref([
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
  }
])
const topicList = ref([
  {
    id: 1,
    title: '夏日清爽美食推荐',
    author: '小明',
    content:
      '夏天到了，推荐几款清爽美食给大家。比如：冰镇西瓜、凉拌黄瓜、凉皮等。',
    img: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    date: '2024-06-27'
  },
  {
    id: 2,
    title: '最新电影推荐',
    author: '小红',
    content: '最新上映的电影《黑寡妇》非常好看，推荐大家去电影院观看。',
    img: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    date: '2024-06-28'
  },
  {
    id: 3,
    title: '最新电视剧推荐',
    author: '小刚',
    content: '最新热播的电视剧《青春有你》非常好看，推荐大家观看。',
    img: 'https://img.yzcdn.cn/vant/apple-4.jpg',
    date: '2024-06-29'
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
/**
 * @description: 去话题详情页
 * @param {*} id 话题id
 * @return {*}
 * @example: 例子
 */
const goNewsDetail = (id) => {
  router.push(`/newsDetail/${id}`)
}
</script>
<template>
  <div class="container">
    <van-nav-bar title="Profile">
      <template #right>
        <van-icon
          name="ellipsis"
          size="2em"
          color="#000"
          @click="showPopover = !showPopover"
          v-click-outside="() => (showPopover = false)"
        />
      </template>
    </van-nav-bar>
    <DiyPop :isShow="showPopover" :canLogout="userInfo.username ? true : false">
      <van-icon name="revoke" color="#fff" size="20" />&nbsp;退出登录
    </DiyPop>
    <div class="avatar">
      <div class="left">
        <van-image
          width="25vw"
          height="25vw"
          fit="cover"
          round
          :src="avatarImg"
          @click="showImagePreview({ images: [avatarImg], showIndex: false })"
        >
          <template #loading>
            <van-loading />
          </template>
          <template #error><van-icon name="user-o" size="30" /></template>
        </van-image>
      </div>
      <div class="right">
        <p v-if="!userInfo.token">游客您好，请登陆</p>
        <div class="myself" v-else>
          <!-- <div class="myself"> -->
          <!-- TODO:后面直接用store里的数据 -->
          <p>欢迎您：@{{ usersInfo.username }}</p>
          <p>性别：{{ genderMap.get(usersInfo.gender) }}</p>
          <p>简介：{{ usersInfo.introduction }}</p>
          <p>我的口味标签：</p>
          <div class="taste">
            <van-tag
              size="large"
              v-for="item in usersInfo.taste.split(',')"
              :key="item"
              type="primary"
            >
              {{ item }}
            </van-tag>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-if="!userInfo.token" description="暂无数据" />
    <div class="content" v-else>
      <van-tabs v-model:active="active" sticky>
        <van-tab title="我的收藏">
          <van-grid
            :column-num="4"
            style="padding-bottom: 75px"
            square
            clickable
          >
            <van-grid-item
              v-for="item in likeList"
              :key="item.id"
              @click="goDetail(item.id)"
            >
              <van-image
                width="100%"
                height="15vw"
                fit="cover"
                :src="item.img"
              ></van-image>
              <div>{{ item.name }}</div>
            </van-grid-item>
          </van-grid>
        </van-tab>
        <van-tab title="我的话题">
          <van-cell
            v-for="item in topicList"
            :key="item.id"
            :label="item.author"
            :value="item.date"
            is-link
            @click="goNewsDetail(item.id)"
          >
            <template #title>
              <van-text-ellipsis :content="item.title" />
            </template>
            <template #icon>
              <van-image
                width="25vw"
                height="25vw"
                fit="cover"
                :src="item.img"
              />
            </template>
          </van-cell>
        </van-tab>
        <van-back-top bottom="20vw" />
      </van-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .avatar {
    width: 100%;
    height: 150px;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        color: #999;
        padding-left: 25px;
        font-size: 0.8em;
        &:first-child {
          color: #333;
          font-size: 1.5em;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }
      }
      .taste {
        padding-left: 25px;
        margin-top: 5px;
        .van-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .content {
    padding-bottom: 70px;
  }
}
</style>
