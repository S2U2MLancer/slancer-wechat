/**
 * Account Service Urls
 */
import * as api_handler from './api_handler.js'


export function wechat_login(code, success_cb, fail_cb) {
  let service_url = '/account/wechat/' + code + '/login'
  let url = api_handler.build_url(service_url)

  wx.request({
    url: url,
    method: 'POST',
    success: resp => api_handler.response_process(resp, success_cb, fail_cb)
  })
}

export const genderEnum = {
  0: 'Unknown',
  1: 'Male',
  2: 'Female'
}

export class WechatRegInfo {
  constructor(
    code, nick_name, avatar_url, 
    gender, city
  ) {
    this.code = code
    this.nick_name = nick_name
    this.avatar_url = avatar_url
    this.gender = gender
    this.city = city
  }
}
export function wechat_reg(reg_info, success_cb) {
  let service_url = '/account/wechat/reg'
  let url = api_handler.build_url(service_url)

  let req_data = {
    wechatCode: reg_info.code,
    nickName: reg_info.nick_name,
    avatarUrl: reg_info.avatar_url,
    gender: reg_info.gender,
    city: reg_info.city
  }

  wx.request({
    url: url,
    method: 'POST',
    data: req_data,
    success: resp => api_handler.response_process(resp, success_cb)
  })
}