<!--
 * @Author: ChenXin
 * @Date: 2024-07-01 11:02:42
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 11:03:05
 * @FilePath: DiyPop.vue
 * @Description: For learning only
-->
<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

defineProps({
  isShow: Boolean,
  canLogout: Boolean
})

const userStore = useUserStore()
const handelClick = ({ target: { innerText } }) => {
  if (innerText.trim() === '关于') {
    router.push('/home')
  } else if (innerText.trim() === '退出登录') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    userStore.clearUserInfo()
  }
}
</script>
<template>
  <Transition>
    <div class="pop" v-show="isShow">
      <p @click="handelClick">
        <van-icon name="info-o" color="#fff" size="20" />&nbsp;关于
      </p>
      <hr v-show="canLogout" />
      <p @click="handelClick" v-show="canLogout">
        <slot></slot>
      </p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.pop {
  position: fixed;
  top: 70px;
  right: 5px;
  width: 140px;
  background-color: #333;
  border-radius: 10px;
  z-index: 10000;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  color: #fff;
  font-size: 1.2em;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 10px;
  &::after {
    content: '';
    position: absolute;
    top: -18.5px;
    right: 15px;
    border: 10px solid transparent;
    border-bottom-color: #333;
  }
  hr {
    border: 0;
    height: 1px;
    background-color: #fff;
    margin: 5px 0;
  }
  p {
    display: flex;
    margin-left: 5px;
    align-items: center;
  }
}
</style>
