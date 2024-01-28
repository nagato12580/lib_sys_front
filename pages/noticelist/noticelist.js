// pages/noticelist/noticelist.js
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList:[]

  },
  //获取通知列表渲染页面，完成
  getNoticeList(){
    //设置通知列表页标题
    wx.setNavigationBarTitle({
      title: '通知',
    })
    //发起网络请求获取通知列表，根据is_top排序
    var that = this;
    Request.request(Api.notice, {"is_active":1,"ordering":"-created_time"}, 'GET').then(
      function(res) {
        //根据is_top逆排序
        res.data.sort(function(a,b){
          return b.is_top-a.is_top
        })
        that.setData({
          noticeList:res.data
        })
      }
    )

  },
  //获取点击通知的id,进行跳转
  getNoticeDetail(e){
    // 获取通知id
    var id=e.currentTarget.dataset.id
    //页面跳转
    wx.navigateTo({
      url: '/pages/noticelist/notice/notice?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    //获取通知列表
    this.getNoticeList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  }
})