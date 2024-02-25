// pages/user/user.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import request from '../../apis/request';
//导入store实例对象
import {store} from '../../store/store'
var loginFunc = require("./../../utils/login.js")
const app = getApp();
var Request = require("./../../apis/request.js")
var api = require("./../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    status: {},
    is_new: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var jwt = wx.getStorageSync('jwt');
    if(jwt){
      this.setData({
        hasUserInfo:true,
        userInfo:app.globalData.userInfo
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
    //这里无法访问全局变量
    //获取当前用户信息
    this.getUserInfo()
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

  // 自定义方法
  //点击登录，完成
  getUserProfile(){
    var jwt = wx.getStorageSync('jwt');
    if (!jwt) { //检查 jwt 是否存在 如果不存在调用登录
      console.log("JWT不存在，准备开始调用登陆函数")
      loginFunc.login()
      console.log()
      this.setData({
        hasUserInfo:true
      })
      // 设置定时器设置userInfo
      var instance = setInterval(()=>{
        this.setData({
          userInfo:app.globalData.userInfo
        })
        console.log("定时器执行")
        //关闭定时器
        if(this.data.userInfo!=null){
          clearInterval(instance)
        }
      }, 1000)
      console.log("调用完成")

    } else {
      app.globalData.jwt = jwt
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
  },

  //点击修改昵称和头像（可以用微信昵称和头像）
  goProfile(){
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo',
    })
  },
  //获取userInfo
  getUserInfo() {
    let that = this;
    Request.request(api.getUserInfo,{},'GET').then(function (res) {
      if (res.statusCode==200) {
        let userInfo={
          'username':res.data.username,
          'wx_photo':res.data.wx_photo
        }
        that.setData({
          userInfo: userInfo,
          hasUserInfo: true
        });
      }
    })
  },
  //获取我的收藏列表
  toMyStarBookList(){
    if(this.data.hasUserInfo){
        wx.navigateTo({
          url: '/pages/user/mystar/mystar',
        })
      }
  },
  //获取我的资料
  toMyDetailInfo(){
    if(this.data.hasUserInfo){
      wx.navigateTo({
        url: '/pages/user/userdetail/userdetail',
      })
    }
  }

})