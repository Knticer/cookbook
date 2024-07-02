/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:35:05
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 17:26:47
 * @FilePath: user.js
 * @Description: For learning only
 */
import request from '@/utils/request'

/**
 * @description: 用户登录
 * @param {*} data 用户登录信息(username, password)
 * @return {*}
 * @example: 例子
 */
export const userLoginService = (data) => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

/**
 * @description: 用户登出
 * @return {*}
 * @example: 例子
 */
export const userLogoutService = () => {
  return request({
    method: 'post',
    url: '/user/logout'
  })
}

/**
 * @description: 用户注册
 * @param {*} data 用户注册信息(formData格式)
 * @return {*}
 * @example: 例子
 */
export const userRegisterService = (data) => {
  return request({
    method: 'post',
    url: '/user/register',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/**
 * @description: 获取我的收藏
 * @return {*}
 * @example: 例子
 */
export const userGetFavoriteService = () => {
  return request({
    method: 'get',
    url: '/favorite/user'
  })
}
