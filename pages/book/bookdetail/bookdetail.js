// pages/bookdetail/bookdetail.js
var Request = require("../../../apis/request.js")
var Api = require("../../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail:[],
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '复制链接', icon: 'link' },
    ],
  },
  onClickShare(event){
    this.setData({ showShare: true });
  },
  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取图书id
    var that=this
    var id=options.id
    Request.request(Api.book+`/${id}/`,{},'GET').then(
      function(res){
        that.setData({
          'bookDetail':res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.bookTitle,
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