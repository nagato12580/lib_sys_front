// pages/book/book.js
import {promisifyAll} from 'miniprogram-api-promise'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
const appData = getApp().globalData;
const wxp = wx.p = {}
promisifyAll(wx,wxp)
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
Page({
  

  /**
   * 页面的初始数据
   */
  //这里是侧边栏菜单数据，待换成后端数据库数据
  data: {
    menu:['文化','经济','艺术','计算机','军事','文化','经济','艺术','计算机','军事','文化','经济','艺术','计算机','军事','文化','经济','艺术','计算机','军事'],
    msg:"请输入",
    value:'',
    //用于获取当前选中的是哪个标签
    activeKey: 0,
    typeList:[],
    sencondList:[]

  },
  //获取书籍分类数据
  async getBookCategory(){
    const res = await wx.p.request({
      url:`${appData.baseUrl}/api/category/`,
      method:'GET'
  })
    console.log(res.data);
    this.setData({
      typeList:res.data,
      sencondList:res.data[0].second_type
    })
  },
  //获取二级书籍二级分类数据
  onChange(event) {
    var index=event.detail
    const data=this.data.typeList
    this.setData({
      sencondList:data[index].second_type
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBookCategory()
        //页面加载时候，绑定全局数据变量

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
  //传递给子组件的方法，用于获取从子组件传递过来的当前点击book_type_id
  async syncBookType(e){
    //获取当前选择书籍二级id：e.detail.type_id
    //发起请求获取该分类下所有图书，之后携带数据进行页面跳转
    const res = await wx.p.request({
      url:`${appData.baseUrl}/api/book?category=${e.detail.type_id}&page=1&limit=9`,
      method:'GET'
  })
    let bookList = JSON.stringify(res.data.results)
    let nextUrl = res.data.next
    //进行跳转
    wx.navigateTo({
      url: '/pages/chart/chart?pt=3&bookList='+bookList+'&nextUrl='+nextUrl,
    })
  }
})