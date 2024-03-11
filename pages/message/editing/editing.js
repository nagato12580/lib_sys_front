// pages/message/editing/editing.js
var Request = require("../../../apis/request.js");
var Api = require("../../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:'',
    themeTitle: '',
    themeContent: '',
    contentCount:0,
    titleCount:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      bookId:options.bookId
    })
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
  bindTitleInput: function (e) {
    const title = e.detail.value;
    const count = title.length;
    if (count <= 50) {
      this.setData({
        themeTitle: title
      });
    }
  },

  bindContentInput: function (e) {
    const content = e.detail.value;
    const count = content.length;
    if(count <= 200){
      this.setData({
        themeContent: content,
        contentCount: count
      });
    }


  },
  //发布主题
  publishTheme: function () {
    var that=this
    var id=this.data.bookId
    console.log(id)
    var title=this.data.themeTitle
    var content=this.data.themeContent
    Request.request(Api.bookMessage,{'title':title,'content':content,'book':id},'POST').then(function(res){
      console.log(res)
      if(res.statusCode==201){
          // 显示发布成功的悬浮框
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 500, // 悬浮框显示时间
            success: () => {
              // 2秒后跳转到其他页面
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/message/message?book_id='+id,
                });
              }, 500);
            }
          });

      }
      else{
          // 显示发布成功的悬浮框
          wx.showToast({
            title: '发布失败',
            icon: 'error',
            duration: 500, // 悬浮框显示时间
          });
        console.log("发布失败")
      }
    })
  
    

    // 发布成功后可以进行页面跳转等操作
    // wx.navigateTo({
    //   url: '发布成功页面的路径',
    // });
  }
})