// pages/me/me.js
import * as accountAPIs from '../apis/Login';
import { AccountErrorType, AccountErrorCode } from '../../../error/AccountError';
import {serverErrorHandle} from '../../../error/ServerError';
import {ClientKeys} from '../../../config/ClientKeys';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    loginCode: null,
    userInfo: {
      avatarUrl: "",
      nickName: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(`${this.data.isLogin}`)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: ClientKeys.UserInfo,
      success: (res) => {
        if (!res.data) {
          return
        }

        this.setData({
          isLogin: true,
          userInfo: res.data,
          loginCode: null
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loginSuccess: function(resp) {
    this.setData({
      isLogin: true,
      userInfo: resp.userInfo
    })
  },

  loginFailed: function(err) {
    if (err.type === AccountErrorType && err.code === AccountErrorCode.UserNotExisted) {
      wx.navigateTo({
        url: `../reg/reg?code=${this.data.loginCode}`
      })
      return
    }

    serverErrorHandle(err)
  },

  wxLoginSuccessCB: function(res) {
    if (!res.code) {
      console.warn('登录失败！' + res.errMsg)
      return
    }
    
    console.debug(`Wx Login Code: ${res.code}`);
    this.setData({
      loginCode: res.code
    })
    accountAPIs.login(res.code, this.loginSuccess, this.loginFailed)
  },

  login: function() {
    wx.login({
      success: this.wxLoginSuccessCB
    })
  }
})