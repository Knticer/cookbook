/*
 * @Author: ChenXin
 * @Date: 2024-07-01 21:07:07
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 21:37:44
 * @FilePath: home.js
 * @Description: For learning only
 */
import request from '@/utils/request'

export const homeSwiperService = () => {}

/**
 * @description: 获取菜系
 * @return {*}
 * @example: 例子
 */
export const homeCuisineService = () => {
  return request({
    url: '/cuisine/get',
    method: 'get'
  })
}

/**
 * @description: 获取热门菜谱
 * @return {*}
 * @example: 例子
 */
export const homeGetHotService = () => {
  return request({
    url: '/recipe/hot',
    method: 'get'
  })
}
