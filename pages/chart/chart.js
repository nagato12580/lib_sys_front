// pages/chart/chart.js
import Toast from '@vant/weapp/toast/toast';
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
var func = require("../../utils/function.js")
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
    //定义一个节流阀，但上拉请求数据之后设置true，但请求完成之后设置false
    isloding:false,
    title:{},
    //在传递bookList时候必须传递next_page
    nextUrl:null,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //动态根据所传递参数设置title值
    if(options.pt==='1'){
      wx.setNavigationBarTitle({
        title: "热门图书",
      })
    }
    if( options.pt==='2'){
      wx.setNavigationBarTitle({
        title: "新书一览",
      })
    }
    if( options.pt==='3'){
      wx.setNavigationBarTitle({
        title: "图书列表",
      })
    }
    if( options.pt==='4'){
      wx.setNavigationBarTitle({
        title: "我的收藏",
      })
    }
    //将bookList传递给组件渲染页面
    let bookList=JSON.parse(options.bookList)
    //带有特殊字符&需要进行编码和解码
    let nextUrl = JSON.parse(decodeURIComponent(options.nextUrl));
    console.log(nextUrl)
    this.setData({
      bookList:bookList,
      nextUrl:nextUrl
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // wx.setNavigationBarTitle({
    //   title:this.data.title
    // })

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
    //请求下一页数据拼接bookList
    //无下一页数据，直接返回
    if(this.data.nextUrl===null){
      return
    }
    this.getNextPageDate()
  },
  //获取下一页数据
  async getNextPageDate(){
    var url=this.data.nextUrl
    const res = await wx.p.request({
      url:url,
      method:'GET'
  })
  let bookList = [...this.data.bookList,...res.data.results]
  let nextUrl=res.data.next
  this.setData({
    bookList:bookList,
    nextUrl:nextUrl
  })
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})