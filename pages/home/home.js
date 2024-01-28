// pages/home/home.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx,wxp)
const appData = getApp().globalData;
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
var func = require("../../utils/function.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里等待换成后端传过来的图片数据
    //首页轮播图设置
    images:[],
    noticeList: [],
    popularList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  //获取图书id，进行跳转图书详情页面，完成后
getBookId(e){
  //获取图书id
  var id=e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/book/bookdetail/bookdetail?id='+id,
  })
  },
  //获取论播图数据的方法，完成
  getSwiperList(){
    var that = this;
    // 获取轮播图数据
    Request.request(Api.swiper, {"is_active":1}, 'GET')
    .then(function(res) {
      that.setData({
        images:res.data[0].full_image_path
      })
    })
  },

//获取首页热门书籍列表,完成
async getPopularList(){
  const res = await wx.p.request({
    url:`${appData.baseUrl}/api/borrow/get_popular/?page=1&limit=9`,
    method:'GET'
})
  this.setData({
    popularList:res.data.results
  })
},

//获取书籍列表数据进行跳转,完成
async getBookList(){
  const res = await wx.p.request({
    url:`${appData.baseUrl}/api/borrow/get_popular/?page=1&limit=6`,
    method:'GET'
})
//作为参数并且传递给目标页面进行渲染 url="/pages/chart/chart?popularity=1" 
let bookList = JSON.stringify(res.data.results)
let nextUrl=encodeURIComponent(JSON.stringify(res.data.next));
console.log(nextUrl)
wx.navigateTo({
  url: '/pages/chart/chart?pt=1&bookList='+bookList+'&nextUrl='+nextUrl,
})

},

//获取s首页公告列表，完成
getHomeNotice(){
  var that = this;
  // 获取通知列表数据数据
  Request.request(Api.notice, {"is_active":1,"is_top":1}, 'GET')
  .then(function(res) {
    that.setData({
      noticeList:res.data
    })
  })
  
},

//获取公告详情数据，然后进行跳转 完成
// url="/pages/noticelist/notice/notice"，具体id在参数中
getNoticeDetial(e){
  //获取通知id
  var id=e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/noticelist/notice/notice?id='+id,
  })
},
//跳转进入公告列表页面 完成
//url="/pages/noticelist/noticelist"
getNoticeList(){
  wx.navigateTo({
    url: '/pages/noticelist/noticelist'
  })
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getPopularList(),
    this.getSwiperList(),
    this.getHomeNotice()
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
    //设置之后才会自动停止刷新
    wx.stopPullDownRefresh()

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