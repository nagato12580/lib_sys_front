// pages/notice/notice.js
var Request = require("../../../apis/request.js");
var Api = require("../../../apis/api.js")
var func = require("../../../utils/function.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeDetail:[]

  },
  //下载文件
  getFile(e){
    //获取下载文件id
    var id=e.currentTarget.dataset.id
    //获取下载文件url
    var url=this.data.noticeDetail[0].full_image_path[id].url
    //发起下载请求
    func.downloadFile(url)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    //获取通知id
    var id=options.id
    //发起请求获取数据
    Request.request(Api.notice, {'id':id}, 'GET').then(
      function(res) {
        that.setData({
          noticeDetail:res.data
        }),
        //设置通知标题为导航标题
        wx.setNavigationBarTitle({
          title:res.data[0].title
        })
      }
    )
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