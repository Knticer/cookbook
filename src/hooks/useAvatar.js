/*
 * @Author: ChenXin
 * @Date: 2024-06-29 17:51:51
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-30 17:17:56
 * @FilePath: useAvatar.js
 * @Description: For learning only
 */
import { computed } from 'vue'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useAvatar = (userStore) => {
  const avatarImg = computed(() => {
    return (
      (userStore?.userInfo?.avatar &&
        `${SERVER_URL}${userStore?.userInfo?.avatar}`) ||
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
  })

  return {
    avatarImg
  }
}
