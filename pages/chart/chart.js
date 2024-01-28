// pages/chart/chart.js
import Toast from '@vant/weapp/toast/toast';
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js")
var func = require("../../utils/function.js")
const appData = getApp().globalData;

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

  //获取排行榜数据列表
  // getbookList(cb){
  //   //控制节流阀
  //   this.setData({
  //     isloding:true
  //   })
  //   //展示loding效果
  //   wx.showLoading({
  //     title: '数据加载中…',
  //   })
  //   //这里应该从后端获取排行数据
  //   const appData = getApp().globalData;
  //   wx.request({
  //     url: `${appData.baseUrl}/api/borrow/get_popular?page=1&limit=6`,
  //     method:'GET',
  //     success:({data:res})=>{
  //       console.log(res),
  //       this.setData({
  //         bookList:res.results,
  //         next_page:res.next
  //       })
  //     },
  //     //不领成功还是失败都会调用的函数
  //     complete:({data:res}) => {
  //       console.log('不知道.....')
  //       //隐藏loding加载框
  //         wx.hideLoading()
  //       //请求完成，关闭isloding
  //       this.setData({
  //         isloding:false
  //       })
  //       //若接收到回调函数则调用
  //       cb && cb()

        
  //     }
  //   })
  // },



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
    //将bookList传递给组件渲染页面
    let bookList=JSON.parse(options.bookList)
    //带有特殊字符&需要进行编码和解码
    let nextUrl = JSON.parse(decodeURIComponent(options.nextUrl));
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
    // 提取参数
    var nextUrl=this.data.nextUrl
    var str = nextUrl.split('?')
    //将路径参数转换为对象
    var paras={}
    paras=func.getUrlParasObj(str[1])
    var that = this;
    Request.request(Api.popularBooklist, paras, 'GET')
      .then(function(res) {
        that.setData({
          //展开运算符，拼接数组
          bookList:[...that.data.bookList,...res.data.results],
          nextUrl:res.data.next
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})