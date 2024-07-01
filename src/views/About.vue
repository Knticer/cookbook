<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:26:06
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 11:02:21
 * @FilePath: About.vue
 * @Description: For learning only
-->
<script setup>
import { useAvatar } from '@/hooks/useAvatar'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import DiyPop from './components/DiyPop.vue'

defineOptions({
  name: 'AboutPage'
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { avatarImg } = useAvatar(userStore)
const showPopover = ref(false)
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
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
</style>
