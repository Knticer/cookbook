/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:35:24
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-30 17:28:36
 * @FilePath: request.js
 * @Description: For learning only
 */
import router from '@/router'
import axios from 'axios'
import {
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast
} from 'vant'

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.token = token)
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    console.log(response)
    const token = response.data.token
    token && localStorage.setItem('token', token)
    if (response.data.code === 200) {
      showSuccessToast({
        message: response.data.msg
      })
    }
    closeToast()

    return response.data
  },
  (error) => {
    showFailToast({
      message: error.response.data.msg
    })
    // 用户权限不足或者token过期，跳转登录页
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.replace('/login')
    }

    return Promise.reject(error.response.data)
  }
)

export default instance
