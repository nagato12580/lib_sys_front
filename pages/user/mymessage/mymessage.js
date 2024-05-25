// pages/user/mymessage/mymessage.js
var Request = require('../../../apis/request.js');
var Api = require('../../../apis/api.js');
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_id:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id=options.id
    this.setData({
      user_id:id
    })
    this.getMyMessageList(id)
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
    this.getMyMessageList(this.data.user_id)
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
  //获取我的留言列表
  getMyMessageList(id){
    var that=this
    Request.request(Api.bookMessage,{'user_id':id,'ordering':'-created_time'},'GET').then(
      function(res){
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
  //提示是否删除该主题留言
  toDeleteTheme(e){
    var id=e.currentTarget.dataset.id
    Dialog.confirm({
      title: '删除提醒',
      message: '主题留言删除后不可恢复，确定要删除吗？',
    })
      .then(() => {
        // on confirm
        //用户点击确定则删除该留言，并且刷新页面，否则啥也不做
        var that=this
        var user_id=this.data.user_id
        Request.request(Api.deleteMessage,{'message_id':id},'POST').then(function(res){
          if(res.statusCode==200){
            //刷新数据
            that.getMyMessageList(user_id)
          }
        })
      })
      .catch(() => {
        // on cancel
      });

  }
})