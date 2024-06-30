<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:45:04
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-27 11:39:54
 * @FilePath: TabbarPlugin.vue
 * @Description: For learning only
-->
<script setup></script>
<template>
  <van-tabbar
    route
    active-color="#1890ff"
    inactive-color="#7d7e80"
    :border="false"
    style="
      width: 95%;
      margin: 0 10px;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50px;
      margin-bottom: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    "
  >
    <van-tabbar-item replace to="/home" icon="wap-home"></van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="list-switch"> </van-tabbar-item>
    <van-tabbar-item replace to="/news" icon="newspaper"></van-tabbar-item>
    <van-tabbar-item replace to="/about" icon="contact"></van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.van-tabbar-item--active {
  background-color: transparent;
}
</style>
