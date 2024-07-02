/*
 * @Author: ChenXin
 * @Date: 2024-07-01 22:17:28
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 10:08:04
 * @FilePath: category.js
 * @Description: For learning only
 */
import request from '@/utils/request'

/**
 * @description: 根据菜系id获取菜谱
 * @param {*} id 菜系id
 * @return {*}
 * @example: 例子
 */
export const categoryByCuisineService = (id) => {
  return request({
    url: `/recipe/cuisine/${id}`,
    method: 'get'
  })
}

/**
 * @description: 根据食材id获取菜谱
 * @param {*} id 食材id
 * @return {*}
 * @example: 例子
 */
export const categoryByKindService = (id) => {
  return request({
    url: `/recipe/kind/${id}`,
    method: 'get'
  })
}
