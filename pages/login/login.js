// pages/login/login.js
const app = getApp() //用户获取app.js中定义的数据
var Api = require("../../apis/api.js")
var Request = require("../../apis/request.js");
var timer = ''
var num = 0
var content = "在您使用本程序的同时，请认真且时刻遵守图书馆相关规定，祝您使用愉快! "
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    //若已经登录跳转user页面
    if (app.globalData.jwt) {
      wx.switchTab({
        url: '/pages/user/user',
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    // 获取注册页面分享数据
    // Request.request(Api.GeneralSharingViewSet, '', 'GET')
    //   .then(function(res) {
    //     that.setData({
    //       gensharing: res.data
    //     })
    //   })
    // console.log(that.data)
    // timer = setInterval(this.onLoad, 2000)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  agreeGetUser(e) {
    var that = this;
    that.setData({
      disabled: true,
    })
    app.login(e);
  },
  checkboxChange(e) {
    var that = this;
    console.log(num)
    if (num == 0) {
      num = 1
      that.setData({
        disabled: false
      })
      return false
    } else {
      num = 0
      that.setData({
        disabled: true
      })
      return false
    }
  },
  // 点击阅读协议
  yuedu() {
    var that = this
    wx.showModal({
      title: '使用协议',
      content: content,
      showCancel: false,
      confirmText: '我已阅读',
      confirmColor: '#248ffa'
    })
  }
})