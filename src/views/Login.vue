<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:28:25
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-29 21:04:14
 * @FilePath: Login.vue
 * @Description: For learning only
-->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

defineOptions({
  name: 'LoginPage'
})
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'onBlur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'onBlur' }]
})

const onSubmit = async () => {
  // TODO:后面跟上接口，存userStore
  console.log('submit')
  router.replace('/about')
}
</script>
<template>
  <div class="container">
    <van-nav-bar title="Login" @click-left="$router.back()" @click-right="$router.push('/home')">
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
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="rules.username"
            required
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="rules.password"
            required
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 登录 </van-button>
        </div>
      </van-form>
    </div>
    <van-divider
      >还没有账号？
      <router-link to="/register" class="register">立即注册</router-link>
    </van-divider>
    <van-empty description="欢迎使用A216菜谱APP" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .content {
    margin-top: 10px;
  }
  .register {
    color: #1989fa;
  }
}
</style>
