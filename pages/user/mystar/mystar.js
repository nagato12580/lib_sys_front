// pages/user/mystar/mystar.js
var Request = require('../../../apis/request.js');
var api = require('../../../apis/api.js');
const appData = getApp().globalData;
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx,wxp)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    nextUrl:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.toMyStarBookList()

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
    this.toMyStarBookList()

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
    //请求下一页数据拼接bookList
    //无下一页数据，直接返回
    if(this.data.nextUrl===null){
      return
    }
    this.getNextPageDate()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //自定义方法
  //获取我的收藏列表图书
  toMyStarBookList(){
    var that=this
    Request.request(api.collectBook,{'limit':5,'page':1},'GET').then(function(res){
      if(res.statusCode==200){
        console.log(res)
        that.setData({
          bookList:res.data.results,
          nextUrl:res.data.next
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
    //获取下一页数据
    async getNextPageDate(){
      var url=this.data.nextUrl
      const res = await wx.p.request({
        url:url,
        method:'GET',
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('jwt') // 默认值
        },
    })
    let bookList = [...this.data.bookList,...res.data.results]
    let nextUrl=res.data.next
    this.setData({
      bookList:bookList,
      nextUrl:nextUrl
    })
  },
})