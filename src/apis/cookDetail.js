/*
 * @Author: ChenXin
 * @Date: 2024-07-01 21:47:09
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 21:04:36
 * @FilePath: cookDetail.js
 * @Description: For learning only
 */
import request from '@/utils/request'

/**
 * @description: 获取菜谱详情
 * @param {*} id 菜系id(recipeId)
 * @return {*}
 * @example: 例子
 */
export const cookGetService = (id) => {
  return request({
    url: `/recipe/get/${id}`,
    method: 'get'
  })
}

/**
 * @description: 查询菜谱评论
 * @param {*} id 菜谱id
 * @return {*}
 * @example: 例子
 */
export const cookGetCommentService = (id) => {
  return request({
    url: `/recipe/comments/${id}`,
    method: 'get'
  })
}

/**
 * @description: 添加菜谱评论
 * @param {*} data 添加评论的数据
 * @return {*}
 * @example: 例子
 * {
 *  "userId": 1,
 *  "recipeId": 1,
 *  "title": "评论标题",
 *  "description": "评论内容",
 * }
 */
export const cookCommentAddService = (data) => {
  return request({
    url: '/recipe/comments/add',
    method: 'post',
    data
  })
}

/**
 * @description: 添加菜谱收藏
 * @param {*} id 菜谱id
 * @return {*}
 * @example: 例子
 */
export const cookAddFavoriteService = (id) => {
  return request({
    url: `/favorite/add/${id}`,
    method: 'post'
  })
}
