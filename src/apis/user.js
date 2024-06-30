/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:35:05
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-30 17:12:03
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
