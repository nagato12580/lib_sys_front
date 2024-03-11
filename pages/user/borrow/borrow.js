// pages/user/borrow/borrow.js
var Request = require("../../../apis/request.js")
var Api = require("../../../apis/api.js")
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myNoReturnedList:[],
    myReturnedList:[],
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyBorrowList()
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
  //获取我的借阅列表
  getMyBorrowList(){
    var that =this
    Request.request(Api.myBorrow,{},'GET').then(
      function(res){
        console.log(res)
        that.setData({
          myNoReturnedList:res.data.no_returned,
          myReturnedList:res.data.returned,
        })
    })
  },
  // onChange(event) {
  //   wx.showToast({
  //     title: `切换到标签 ${event.detail.name}`,
  //     icon: 'none',
  //   });
  // },
  // onClick(event) {
  //   wx.showToast({
  //     title: `点击标签 ${event.detail.name}`,
  //     icon: 'none',
  //   });
  // },
  //归还图书
  toReturnedBook(e){
    //获取当前图书id
    console.log(e)
    var ISBN=e.currentTarget.dataset.isbn
    var id=e.currentTarget.dataset.id
        // 允许从相机和相册扫码
        wx.scanCode({
          onlyFromCamera:true,
          scanType:['barCode'],
          success:res=>{
            if(res.result==ISBN){
              console.log("图书相符")
              var that=this
              Request.request(Api.returned,{'book_id':id},'POST').then(
                function(res){
                  if(res.statusCode==200){
                    Notify({ type: 'success', message: '归还成功' });
                    //更新馆藏数据
                    that.getMyBorrowList()
                  }
                  else{
                    Notify({ type: 'danger', message: '归还失败' });
                  }
                }
              )
            }
            else{
              Notify({ type: 'warning', message: '图书不符' });
            }
            
          },
          fail:err=>{
            console.log(err);
          }
        })
  },
  //点击跳转到图书详情页
  toBookDetail(e){
    var id=e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/book/bookdetail/bookdetail?id='+id,
    })
  }
})