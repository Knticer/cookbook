<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:26:06
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 23:16:48
 * @FilePath: About.vue
 * @Description: For learning only
-->
<script setup>
import { useAvatar } from '@/hooks/useAvatar'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { showImagePreview } from 'vant'
import DiyPop from './components/DiyPop.vue'
import { useRouter } from 'vue-router'
import { userGetFavoriteService, userGetTopicService } from '@/apis/user'
import dayjs from 'dayjs'

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

// 标签栏相关
const active = ref(0)
const likeList = ref([])
const getFavorite = async () => {
  const res = await userGetFavoriteService()
  likeList.value = res.data
}
const topicList = ref([])
const getTopic = async () => {
  const res = await userGetTopicService(userInfo.value.uerId)
  topicList.value = res.data
}

onMounted(() => {
  if (userInfo.value.token) {
    getFavorite()
    getTopic()
  }
})
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
          <p>欢迎您：@{{ userInfo.username }}</p>
          <p>性别：{{ genderMap.get(userInfo.gender) }}</p>
          <p>简介：{{ userInfo.introduction }}</p>
          <p>我的口味标签：</p>
          <div class="taste">
            <van-tag
              size="large"
              v-for="item in userInfo.taste?.split(',')"
              :key="item"
              type="primary"
            >
              {{ item }}
            </van-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="userInfo.token">
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
              :key="item.favoriteId"
              @click="goDetail(item.recipe.recipeId)"
            >
              <van-image
                width="100%"
                height="15vw"
                fit="cover"
                :src="`http://localhost:9090${item.recipe.img}`"
              ></van-image>
              <!-- <van-text-ellipsis :content="item.recipe.name" /> -->
              <div>{{ item.recipe.name }}</div>
            </van-grid-item>
          </van-grid>
        </van-tab>
        <van-tab title="我的话题">
          <van-cell
            v-for="item in topicList"
            :key="item.topicId"
            :label="item.username"
            :value="dayjs(item.createTime).format('YYYY-MM-DD')"
            is-link
            @click="goNewsDetail(item.topicId)"
          >
            <template #title>
              <van-text-ellipsis :content="item.title" />
            </template>
            <template #icon>
              <van-image
                width="25vw"
                height="25vw"
                fit="cover"
                :src="`http://localhost:9090${item.img}`"
              />
            </template>
          </van-cell>
        </van-tab>
        <van-back-top bottom="20vw" />
      </van-tabs>
    </div>
    <van-empty v-else description="暂无数据">
      <van-button
        style="width: 150px; margin-top: 10px"
        type="primary"
        icon="manager-o"
        round
        @click="() => router.push('/login')"
      >
        登陆
      </van-button>
    </van-empty>
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
    :deep .van-cell__title {
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>
