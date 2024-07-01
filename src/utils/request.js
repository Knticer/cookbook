/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:35:24
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 23:02:48
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
    token && (config.headers['token'] = token)
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  (error) => {
    closeToast()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const token = response.data.data.token
    token && localStorage.setItem('token', token)
    if (response.data.code === 200) {
      showSuccessToast({
        message: response.data.msg
      })
    } else if (response.data.code === 401) {
      showFailToast({
        message: response.data.msg
      })
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.replace('/login')
    } else if (response.data.code === 400) {
      showFailToast({
        message: response.data.msg
      })
    }
    closeToast()
    return response.data
  },
  (error) => {
    closeToast()
    return Promise.reject(error.response.data)
  }
)

export default instance
