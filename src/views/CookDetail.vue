<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:32:17
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-03 17:03:06
 * @FilePath: CookDetail.vue
 * @Description: For learning only
-->
<script setup>
import {
  cookGetService,
  cookGetCommentService,
  cookCommentAddService,
  cookAddFavoriteService
} from '@/apis/cookDetail'
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取菜谱详情
const cookObj = ref({})
const getDetail = async () => {
  const res = await cookGetService(route.params.id)
  cookObj.value = res.data
}

/**
 * @description: 点击收藏
 * @return {*}
 * @example: 例子
 */
const goCollect = async () => {
  !cookObj.value.favorite &&
    (await cookAddFavoriteService(cookObj.value.recipeId))
  await getDetail()
}
/**
 * @description: 取消收藏
 * @return {*}
 * @example: 例子
 */
const goCancelCollect = async () => {
  cookObj.value.favorite &&
    (await cookAddFavoriteService(cookObj.value.recipeId))
  await getDetail()
}

// 菜谱评论相关逻辑
const commentList = ref([])
const getComment = async () => {
  const res = await cookGetCommentService(route.params.id)
  commentList.value = res.data
}

onMounted(() => {
  getDetail()
  getComment()
})

// 动作面板逻辑
const userStore = useUserStore()
const token = userStore.userInfo.token

const showAction = ref(false)
const formRef = ref(null)
const ruleForm = ref({
  userId: userStore.userInfo.uerId,
  recipeId: route.params.id,
  title: '',
  description: ''
})
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'onBlur' }],
  description: [
    { required: true, message: '请输入评论内容', trigger: 'onBlur' }
  ]
})
/**
 * @description: 提交评论
 * @return {*}
 * @example: 例子
 */
const onSubmit = async () => {
  if (!token) return
  await formRef.value.validate()
  await cookCommentAddService(ruleForm.value)
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
  ruleForm.value.description = ''
  formRef.value.resetValidation()
  showAction.value = false
}
</script>
<template>
  <div class="container">
    <van-nav-bar
      title="Cookbook"
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
    <div class="content">
      <van-image
        width="100%"
        height="200"
        fit="cover"
        :src="`http://localhost:9090${cookObj.img}`"
      />
      <div class="detail">
        <h1>{{ cookObj.name }}</h1>
        <div class="msg">
          <span>浏览量：{{ cookObj.views }} / </span>
          <span>收藏：{{ cookObj.collects }}</span>
        </div>
        <van-button
          round
          style="margin-top: 10px"
          @click="goCollect"
          v-show="!cookObj.favorite"
        >
          点击收藏
        </van-button>
        <van-button
          round
          style="margin-top: 10px"
          type="danger"
          v-show="cookObj.favorite"
          @click="goCancelCollect"
        >
          取消收藏
        </van-button>
      </div>
      <p class="title">食材准备</p>
      <van-cell-group inset>
        <van-cell
          v-for="item in cookObj.ingredientsVo"
          :key="item.name"
          :title="item.name"
          :value="item.weight"
        />
      </van-cell-group>
      <p class="title">制作步骤</p>
      <van-cell-group inset>
        <van-cell :value="cookObj.description" />
      </van-cell-group>
      <div class="comment">
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
              v-model="ruleForm.description"
              rows="2"
              autosize
              label="评论内容"
              type="textarea"
              :rules="rules.description"
              placeholder="请输入评论内容"
              required
            />
            <van-button round block type="primary" native-type="submit">
              提交评论
            </van-button>
          </van-form>
          <van-empty v-else description="请先登录" />
        </van-action-sheet>
        <van-cell-group>
          <van-cell
            v-for="item in commentList"
            :key="item.commentsId"
            :title="item.user.username"
            :label="item.createTime"
            :value="item.description"
          >
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
      </div>
      <van-back-top bottom="20vw" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: hidden;
  .content {
    height: calc(100vh - 100px);
    overflow: auto;
    .title {
      font-size: 16px;
      color: #1c8eff;
      font-weight: bold;
      margin: 10px 20px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      padding: 10px 20px;
      h1 {
        font-size: 20px;
        color: #333;
        font-weight: bold;
      }
      .msg {
        color: #666;
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .comment {
      margin-top: 20px;
      :deep .van-cell__title {
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>
