/*
 * @Author: ChenXin
 * @Date: 2024-07-02 21:06:30
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-02 22:42:33
 * @FilePath: news.js
 * @Description: For learning only
 */
import request from '@/utils/request'

/**
 * @description: 获取话题列表
 * @return {*}
 * @example: 例子
 */
export const newsGetService = () => {
  return request({
    url: '/topic/hot',
    method: 'get'
  })
}

/**
 * @description: 话题详情
 * @param {*} id 话题id
 * @return {*}
 * @example: 例子
 */
export const newsCurrentService = (id) => {
  return request({
    url: `/topic/get/${id}`,
    method: 'get'
  })
}

/**
 * @description: 获取话题评论
 * @param {*} id 话题id
 * @return {*}
 * @example: 例子
 */
export const newsCommentService = (id) => {
  return request({
    url: `/topic/comment/${id}`,
    method: 'get'
  })
}

/**
 * @description: 添加评论
 * @param {*} data 评论内容
 * @return {*}
 * @example: 例子
 * {
 *  "topicId": 1,
 *  "userId": 1,
 *  "title": "评论标题",
 *  "content": "评论内容"
 * }
 */
export const newsAddCommentService = (data) => {
  return request({
    url: '/topic/comment/add',
    method: 'post',
    data
  })
}
