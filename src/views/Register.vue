<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:29:08
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-03 16:03:23
 * @FilePath: Register.vue
 * @Description: For learning only
-->
<script setup>
import { userRegisterService } from '@/apis/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'RegisterPage'
})
const ruleForm = ref({
  username: '',
  password: '',
  gender: '',
  taste: [],
  introduction: '',
  avatar: [],
  file: null
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'onBlur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'onBlur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'onChange' }],
  taste: [{ required: true, message: '请选择口味标签', trigger: 'onChange' }],
  introduction: [
    { required: true, message: '请输入个人简介', trigger: 'onBlur' }
  ]
})

const updateFile = ({ file }) => {
  ruleForm.value.avatar = [{ url: URL.createObjectURL(file), isImage: true }]
  ruleForm.value.file = file
}

const router = useRouter()
const onSubmit = async () => {
  const params = new FormData()
  const subForm = ref({
    ...ruleForm.value,
    taste: ruleForm.value.taste.join(',')
  })
  for (const i in subForm.value) {
    params.append(i, subForm.value[i])
  }
  await userRegisterService(params)
  router.replace('/login')
}
</script>
<template>
  <div class="container">
    <van-nav-bar
      title="Register"
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
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="ruleForm.username"
            name="用户名"
            label="用户名"
            placeholder="请输入用户名"
            :rules="rules.username"
            required
          />
          <van-field
            v-model="ruleForm.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="rules.password"
            required
          />
          <van-field name="性别" label="性别" :rules="rules.gender" required>
            <template #input>
              <van-radio-group v-model="ruleForm.gender" direction="horizontal">
                <van-radio :name="0">不愿透露</van-radio>
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            name="checkboxGroup"
            label="口味标签"
            :rules="rules.taste"
            required
          >
            <template #input>
              <van-checkbox-group
                v-model="ruleForm.taste"
                direction="horizontal"
              >
                <van-checkbox name="酸" shape="square">酸</van-checkbox>
                <van-checkbox name="甜" shape="square">甜</van-checkbox>
                <van-checkbox name="苦" shape="square">苦</van-checkbox>
                <van-checkbox name="辣" shape="square">辣</van-checkbox>
                <van-checkbox name="咸" shape="square">咸</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            v-model="ruleForm.introduction"
            rows="2"
            autosize
            label="个人简介"
            type="textarea"
            maxlength="30"
            :rules="rules.introduction"
            placeholder="请输入个人简介"
            show-word-limit
            required
          />
          <van-field name="uploader" label="个人头像">
            <template #input>
              <van-uploader
                :after-read="updateFile"
                v-model="ruleForm.avatar"
                :max-count="1"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .content {
    margin-top: 10px;
    .van-checkbox {
      margin-bottom: 10px;
    }
  }
}
</style>
