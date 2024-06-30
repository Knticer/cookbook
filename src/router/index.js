/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:08:31
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-27 10:46:47
 * @FilePath: index.js
 * @Description: For learning only
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/Category.vue')
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/views/News.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/cookDetail/:id',
      name: 'CookDetail',
      component: () => import('@/views/CookDetail.vue')
    },
    {
      path: '/newsDetail/:id',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail.vue')
    }
  ]
})

export default router
