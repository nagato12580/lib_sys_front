var Request = require('../../../apis/request.js');
var api = require('../../../apis/api.js');
const app=getApp();
Page({
  data: {
    hasAvatar: 0,
    avatarUrl: wx.getStorageSync('userInfo').wx_photo,
    userName:wx.getStorageSync('userInfo').username
  },
  onShow() {
    //这里无法访问全局变量
    //获取当前用户信息
    this.getUserInfo()
  },


  //上传头像
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    let that = this;
    wx.uploadFile({
      url: api.upLoad,
      filePath:avatarUrl,
      name:'file',
      formData:{
        'dir_name':'wx_photo'
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          let re = res.data
          let echo = JSON.parse(re);
          let data = echo.data;
          console.log(data)
          let avatarUrl = data.fileUrl
          that.setData({
            avatarUrl: avatarUrl,
            hasAvatar: 1,
            wx_photo:data
          })

        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  //修改用户名，这里是双向绑定，输入框更改userName会随之更改
  bindinputUserName(event) {
    let userName = event.detail.value;
    this.setData({
      userName: userName,
    });
  },
  //保存修改了的头像和用户名
  saveInfo() {
    Request.request(api.upDateInfo,{
      'username':this.data.userName,
      'avatar':this.data.wx_photo
    },'POST').then(function(res){
      console.log(res.data)
      var userInfo={
        'username':res.data.username,
        'wx_photo':res.data.wx_photo
      }
      app.globalData.userInfo = userInfo
      wx.navigateBack()
    })


  },
  //获取userInfo
  getUserInfo() {
    let that = this;
    Request.request(api.getUserInfo,{},'GET').then(function (res) {
      if (res.statusCode==200) {
        that.setData({
          avatarUrl: res.data.wx_photo,
          userName: res.data.username
        });
      }
    })
  }


})
