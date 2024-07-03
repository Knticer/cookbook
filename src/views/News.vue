<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:25:26
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-03 10:35:21
 * @FilePath: News.vue
 * @Description: For learning only
-->
<script setup>
import { newsAddService, newsGetService, newsSearchService } from '@/apis/news'
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

defineOptions({
  name: 'NewsPage'
})

const router = useRouter()

// 添加话题相关逻辑
const userStore = useUserStore()
const token = userStore.userInfo.token

const showAction = ref(false)
const formRef = ref(null)
const ruleForm = ref({
  userId: userStore.userInfo.uerId,
  title: '',
  author: '',
  description: '',
  img: [],
  file: null
})
const rules = ref({
  title: [{ required: true, message: '请输入话题标题', trigger: 'onBlur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'onBlur' }],
  description: [
    { required: true, message: '请输入话题内容', trigger: 'onBlur' }
  ]
})
const updateFile = ({ file }) => {
  ruleForm.value.img = [{ url: URL.createObjectURL(file), isImage: true }]
  ruleForm.value.file = file
}
/**
 * @description: 提交话题
 * @return {*}
 * @example: 例子
 */
const onSubmit = async () => {
  const params = new FormData()
  for (const i in ruleForm.value) {
    params.append(i, ruleForm.value[i])
  }
  await newsAddService(params)
  getTopicList()
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
  ruleForm.value.author = ''
  ruleForm.value.description = ''
  ruleForm.value.img = []
  ruleForm.value.file = null
  formRef.value.resetValidation()
  showAction.value = false
}

// 搜索逻辑
const search = ref('')
const onSearch = async (value) => {
  const res = await newsSearchService(value)
  newsList.value = res.data
}

// 话题列表相关逻辑
const newsList = ref([])
const getTopicList = async () => {
  const res = await newsGetService()
  newsList.value = res.data
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

onMounted(() => {
  getTopicList()
})

watchEffect(() => {
  if (!search.value) {
    getTopicList()
  }
})
</script>
<template>
  <div class="container">
    <van-nav-bar title="News">
      <template #right>
        <van-icon
          name="add"
          size="40"
          color="#000"
          @click="showAction = true"
        />
      </template>
    </van-nav-bar>
    <van-search
      v-model="search"
      shape="round"
      input-align="center"
      placeholder="请输入相关话题关键字"
      @search="onSearch"
    />
    <van-action-sheet
      v-model:show="showAction"
      title="添加话题"
      style="padding: 5px"
      @close="clearForm"
    >
      <van-form @submit="onSubmit" ref="formRef" v-if="token">
        <van-field
          v-model="ruleForm.title"
          name="话题标题"
          label="话题标题"
          placeholder="请输入话题标题"
          :rules="rules.title"
          required
        />
        <van-field
          v-model="ruleForm.author"
          name="作者"
          label="作者"
          placeholder="请输入作者"
          :rules="rules.author"
          required
        />
        <van-field
          v-model="ruleForm.description"
          rows="2"
          autosize
          label="话题内容"
          type="textarea"
          :rules="rules.description"
          placeholder="请输入话题内容"
          required
        />
        <van-field name="uploader" label="话题图片">
          <template #input>
            <van-uploader
              v-model="ruleForm.img"
              :after-read="updateFile"
              accept="image/*"
              multiple
              max-count="1"
            />
          </template>
        </van-field>
        <van-button round block type="primary" native-type="submit">
          添加话题
        </van-button>
      </van-form>
      <van-empty v-else description="请先登录" />
    </van-action-sheet>
    <div class="newsList">
      <img src="@/assets/news_header.png" style="width: 100%" />
      <van-cell
        v-for="item in newsList"
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
      <van-back-top bottom="20vw" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  :deep .van-cell__title {
    font-size: 16px;
    margin-left: 10px;
  }
  .newsList {
    height: calc(100vh - 220px);
    overflow: auto;
  }
}
</style>
