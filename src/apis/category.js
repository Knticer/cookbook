/*
 * @Author: ChenXin
 * @Date: 2024-07-01 22:17:28
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 22:19:11
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
