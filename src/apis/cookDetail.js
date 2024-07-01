/*
 * @Author: ChenXin
 * @Date: 2024-07-01 21:47:09
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 21:48:33
 * @FilePath: cookDetail.js
 * @Description: For learning only
 */
import request from '@/utils/request'

/**
 * @description: 获取菜谱详情
 * @param {*} id 菜谱id
 * @return {*}
 * @example: 例子
 */
export const cookGetService = (id) => {
  return request({
    url: `/recipe/get/${id}`,
    method: 'get'
  })
}
