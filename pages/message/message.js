// pages/message/message.js
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookID:'',
    messageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      bookID:options.book_id
    })
    this.getBookMessageTheme()
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

  },
  //自定义函数区域
  //获取该图书相关的留言主题
  getBookMessageTheme(){
    var that=this
    var id=this.data.bookID
    Request.request(Api.bookMessage,{'book_id':id,'ordering':'-updated_time'},'GET').then(function(res){
      if(res.statusCode==200){
        that.setData({
          messageList:res.data
        })
      }
    })
  },
  //跳转留言详情
  getMessageDetail(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/message/messagedetail/messagedetail?message_id='+id,
    })
  },
  //跳转到留言编辑页面
  toMessageEdit(e){
    var bookId=this.data.bookID
    console.log(bookId)
    wx.navigateTo({
      url: '/pages/message/editing/editing?bookId='+bookId,
    })
  }
})