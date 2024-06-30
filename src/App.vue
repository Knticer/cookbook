<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:08:31
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-29 21:01:55
 * @FilePath: App.vue
 * @Description: For learning only
-->
<script setup>
import '@/style/BGAnimation.css'
import '@/style/VantNavbar.css'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pathName = ref(route.name)
watchEffect(() => {
  pathName.value = route.name
})
</script>
<template>
  <RouterView v-slot="{ Component }" style="padding-bottom: 70px">
    <Transition name="fade" mode="out-in">
      <component :is="Component" key="Component" />
    </Transition>
  </RouterView>
  <TabbarPlugin
    v-show="!['CookDetail', 'NewsDetail', 'Login', 'Register'].includes(pathName)"
  ></TabbarPlugin>
</template>

<style lang="scss">
:root:root {
  .van-toast {
    box-sizing: content-box;
    transition: all var(--van-duration-fast);
    background: var(--van-toast-background);
    width: var(--van-toast-default-width);
    max-width: var(--van-toast-max-width);
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
