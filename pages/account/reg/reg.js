import { Gender } from "../apis/Constant";
import * as accountApis from "../apis/Login";
import {serverErrorHandle} from '../../../error/ServerError';
import { RegistReqDTO } from "../apis/DTO";
import { dateFormat } from '../../../utils/date';

// pages/account/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginCode: null,
    wechatUserInfo: {},

    genders: [Gender[0], Gender[1], Gender[2]],
    genderIndex: 0,

    birthday: null

  },

  getWechatUserInfoCb(res) {
    this.setData({
      wechatUserInfo: res.userInfo,
      genderIndex: res.userInfo.gender
    })
  },

  checkSetting: function(res) {
    if (!res.authSetting['scope.userInfo']) {
      return
    }

    wx.getUserInfo({
      success: this.getWechatUserInfoCb
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    this.setData({
      loginCode: options.code,
      birthday: dateFormat(date, "yyyy-MM-dd")
    })

    wx.getSetting({
      success: this.checkSetting
    })
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

  regSuccessCb: function(resp) {
    wx.navigateBack()
  },

  regFailedCb: function(err) {
    serverErrorHandle(err)
  },

  reg: function() {
    const regInfo = new RegistReqDTO(
      this.data.loginCode, 
      this.data.wechatUserInfo.nickName,
      this.data.wechatUserInfo.gender,
      this.data.birthday
    )
    accountApis.reg(regInfo, this.regSuccessCb, this.regFailedCb)
  }
})