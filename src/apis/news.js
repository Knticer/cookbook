/*
 * @Author: ChenXin
 * @Date: 2024-07-02 21:06:30
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-03 21:07:19
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
 * @description: 添加话题
 * @param {*} data 话题内容(formData)
 * @return {*}
 * @example: 例子
 */
export const newsAddService = (data) => {
  return request({
    url: '/topic/add',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/**
 * @description: 搜索话题
 * @param {*} name 话题名
 * @return {*}
 * @example: 例子
 */
export const newsSearchService = (name) => {
  return request({
    url: '/topic/name',
    method: 'get',
    params: {
      name
    }
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

/**
 * @description: 点赞话题
 * @param {*} id 话题id
 * @return {*}
 * @example: 例子
 */
export const newsLikeService = (id) => {
  return request({
    url: `/topic/likes/${id}`,
    method: 'get'
  })
}
