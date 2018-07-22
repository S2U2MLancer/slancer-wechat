// pages/me/me.js
import * as accountAPIs from '../apis/Login';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
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

  loginSuccess: function(code) {
    this.setData({
      isLogin: true
    })
  },

  wxLoginSuccessCB: function(res) {
    if (!res.code) {
      console.warn('登录失败！' + res.errMsg)
      return
    }

    console.debug(`Wx Login Code: ${res.code}`);
    // accountAPIs.login(res.code, (resp) => {
    //   this.setData({
    //     isLogin: true,
    //     userInfo: {
    //       avatarUrl: "",
    //       nickName: "Amos Xia"
    //     }
    //   })
    // })
  },

  login: function() {
    wx.login({
      success: this.wxLoginSuccessCB
    })
  }
})