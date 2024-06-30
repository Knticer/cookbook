/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:21:19
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-27 10:21:44
 * @FilePath: userStore.js
 * @Description: For learning only
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref(JSON.parse(localStorage.getItem('user'))?.userInfo || {})
    const setUserInfo = (data) => {
      userInfo.value = {
        ...userInfo.value,
        ...data
      }
    }
    const clearUserInfo = () => {
      userInfo.value = {}
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
