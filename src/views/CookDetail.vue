<!--
 * @Author: ChenXin
 * @Date: 2024-06-27 10:32:17
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-30 17:07:58
 * @FilePath: CookDetail.vue
 * @Description: For learning only
-->
<script setup>
import { ref } from 'vue'

// TODO: 根据路由参数获取食谱详情
const cookObj = ref({
  title: '番茄炒蛋',
  img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  view: 100,
  like: 50,
  ingredients: [
    { name: '番茄', quantity: '2个' },
    { name: '鸡蛋', quantity: '3个' },
    { name: '盐', quantity: '适量' },
    { name: '油', quantity: '适量' },
    { name: '葱花', quantity: '适量' }
  ],
  content:
    '1. 准备食材：番茄、鸡蛋、盐、油、葱花。2. 番茄切块，鸡蛋打散备用。3. 热锅凉油，倒入鸡蛋炒散。4. 加番茄块翻炒。5. 加盐调味，撒葱花即可。'
})

/**
 * @description: 点击收藏
 * @return {*}
 * @example: 例子
 */
const goCollect = () => {
  // TODO: 收藏逻辑
  console.log('点击收藏')
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
        v-if="cookObj.img"
        width="100%"
        height="200"
        :src="cookObj.img"
      />

      <div class="detail">
        <h1>{{ cookObj.title }}</h1>
        <div class="msg">
          <span>浏览量：{{ cookObj.view }} / </span>
          <span>收藏：{{ cookObj.like }}</span>
        </div>
        <van-button round style="margin-top: 10px" @click="goCollect">
          点击收藏
        </van-button>
      </div>

      <p class="title">食材准备</p>
      <van-cell-group inset>
        <van-cell
          v-for="item in cookObj.ingredients"
          :key="item.name"
          :title="item.name"
          :value="item.quantity"
        />
      </van-cell-group>

      <p class="title">制作步骤</p>
      <van-cell-group inset>
        <van-cell :value="cookObj.content" />
      </van-cell-group>
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
  }
}
</style>
