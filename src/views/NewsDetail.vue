<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:32:50
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-03 16:16:42
 * @FilePath: NewsDetail.vue
 * @Description: For learning only
-->
<script setup>
import {
  newsCurrentService,
  newsCommentService,
  newsAddCommentService
} from '@/apis/news'
import { useUserStore } from '@/stores/userStore'
import dayjs from 'dayjs'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { id } = route.params

// 当前话题详情
const curDetail = ref({})
const getTopic = async () => {
  const res = await newsCurrentService(id)
  curDetail.value = res.data
}
const commentList = ref([])
const getComment = async () => {
  const res = await newsCommentService(id)
  commentList.value = res.data
}

onMounted(() => {
  getTopic()
  getComment()
})

// 动作面板逻辑
const userStore = useUserStore()
const token = userStore.userInfo.token

const showAction = ref(false)
const formRef = ref(null)
const ruleForm = ref({
  topicId: id,
  userId: userStore.userInfo.uerId,
  title: '',
  content: ''
})
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'onBlur' }],
  content: [{ required: true, message: '请输入评论内容', trigger: 'onBlur' }]
})
/**
 * @description: 提交评论
 * @return {*}
 * @example: 例子
 */
const onSubmit = async () => {
  if (!token) return
  await formRef.value.validate()
  await newsAddCommentService(ruleForm.value)
  getComment()
  clearForm()
}
/**
 * @description: 重置表单
 * @return {*}
 * @example: 例子
 */
const clearForm = () => {
  if (!token) return
  ruleForm.value.title = ''
  ruleForm.value.content = ''
  formRef.value.resetValidation()
  showAction.value = false
}
</script>
<template>
  <div class="container">
    <van-nav-bar
      title="Topic"
      @click-left="$router.back()"
      @click-right="$router.push('/home')"
    >
      <template #left>
        <van-icon name="arrow-left" size="30" color="#000" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" size="30" color="#000" />
      </template>
    </van-nav-bar>
    <van-image
      :src="`http://localhost:9090${curDetail.img}`"
      fit="cover"
      width="100%"
      height="50vw"
    />
    <div class="title">
      <p class="top">{{ curDetail.title }}</p>
      <p class="time">{{ dayjs(curDetail.createTime).format('YYYY-MM-DD') }}</p>
      <van-divider
        content-position="right"
        style="margin-top: 10px; margin-bottom: 5px"
      >
        作者：{{ curDetail.username }}
      </van-divider>
    </div>
    <van-cell-group>
      <van-cell title="话题详情" style="color: #1c8eff" />
    </van-cell-group>
    <div class="content">
      {{ curDetail.description }}
    </div>
    <van-cell-group>
      <van-cell title="评论区" style="color: #1c8eff">
        <template #right-icon>
          <van-icon
            name="add"
            size="25"
            color="#1c8eff"
            @click="showAction = true"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-action-sheet
      v-model:show="showAction"
      title="添加评论"
      style="padding: 5px"
      @close="clearForm"
    >
      <van-form @submit="onSubmit" ref="formRef" v-if="token">
        <van-field
          v-model="ruleForm.title"
          name="评论标题"
          label="评论标题"
          placeholder="请输入评论标题"
          :rules="rules.title"
          required
        />
        <van-field
          v-model="ruleForm.content"
          rows="2"
          autosize
          label="评论内容"
          type="textarea"
          :rules="rules.content"
          placeholder="请输入评论内容"
          required
        />
        <van-button round block type="primary" native-type="submit">
          提交评论
        </van-button>
      </van-form>
      <van-empty v-else description="请先登录" />
    </van-action-sheet>
    <div class="comment">
      <van-cell-group>
        <van-cell
          v-for="item in commentList"
          :key="item.commentId"
          :title="item.content"
          :label="item.user.username"
        >
          <template #default>
            <div>{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</div>
          </template>
          <template #icon>
            <van-image
              width="15vw"
              height="15vw"
              fit="cover"
              :src="`http://localhost:9090${item.user.avatar}`"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-back-top bottom="20vw" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding-bottom: 0 !important;
  overflow: auto;
  .title {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 10px;
    .top {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .time {
      color: #999;
      font-size: 14px;
    }
  }
  .content {
    padding: 20px;
    margin-bottom: 10px;
    background-color: #fff;
  }
}
:deep .van-cell__title {
  font-size: 16px;
  margin-left: 10px;
}
</style>
