// pages/book/search/search.js
var Request = require("../../../apis/request.js")
var Api = require("../../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    bookList:[]
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
  setValue(e){
    this.setData(
      {value:e.detail}
    )
  },
  //确定搜索，发起请求获取搜索结果
  getSearchRes(event){
    var that=this
    Request.request(Api.bookSearch,{'value':event.detail},'GET').then(
      function(res){
      if(res.statusCode==200){
        console.log(res)
        that.setData({
          bookList:res.data
        })
      }
    })
  },
  //获取子组件传递过来的图书id
  getSonBookID(e){
    //  获取子组件传过来的数据
    const id = e.detail
    //传递图书id进行跳转
    wx.navigateTo({
      url: '/pages/book/bookdetail/bookdetail?id='+id,
    })
  },
})