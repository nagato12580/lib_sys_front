// pages/bookdetail/bookdetail.js
var Request = require("../../../apis/request.js")
var Api = require("../../../apis/api.js")
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail:[],
    showShare: false,
    isStar:true,
    icon_color:'#1989fa',
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      // { name: '复制链接', icon: 'link' },
    ],
  },
  onClickShare(event){
    this.setData({ showShare: true });
  },
  onClose() {
    this.setData({ showShare: false });
  },
  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
  //收藏图书
  onClickIcon(){
    var book_id=this.data.bookDetail.id
    var that=this
    Request.request(Api.collectBook,{'book_id':book_id},'POST').then(function(res){
      if(res.statusCode==200){
        that.setData({
          isStar:res.data.isStar
        })
      }
    })
  },
  //获取图书详细数据
getBookDetailIndo(id){
  var that=this
  Request.request(Api.book+`/${id}/`,{},'GET').then(
    function(res){
      that.setData({
        'bookDetail':res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.bookTitle,
      })
    }
  )
},
  //查看图书状态
  getStarStatus(id){
    var book_id=id
    var that=this
    Request.request(Api.getStar,{'book_id':book_id},'GET').then(function(res){
      that.setData({
        isStar:res.data.isStar
      })
    })
  },
  //取消收藏图书
  cancelStar(){
    var book_id=this.data.bookDetail.id
    var that=this
    Request.request(Api.cancelStar,{'book_id':book_id},'POST').then(function(res){
      if(res.statusCode==200){
        that.setData({
          isStar:res.data.isStar
        })
      }
    })
  },
  //借阅
  onClickButton(){

    Dialog.alert({
      title: '温馨提醒',
      message: '借阅期限为90天，请您在按时归还图书',
    }).then(() => {
      // on close
        // 允许从相机和相册扫码
        wx.scanCode({
          onlyFromCamera:true,
          scanType:['barCode'],
          success:res=>{
            console.log(res.result)
            if(res.result==this.data.bookDetail.ISBN){
              console.log("图书相符")
              var id=this.data.bookDetail.id
              var that=this
              Request.request(Api.borrow,{'book':id},'POST').then(
                function(res){
                  if(res.statusCode==201){
                    Notify({ type: 'success', message: '借阅成功' });
                    //更新馆藏数据
                    that.getBookDetailIndo(id)
                  }
                  if(res.statusCode==400){
                    Notify({ type: 'warning', message: '库存不足' });
                  }
                }
              )
            }
            else{
              Notify({ type: 'warning', message: '图书不符' });
            }
            console.log(res.result)
          },
          fail:err=>{
            console.log(err);
          }
        })
    });


  },
  //跳转留言界面
  onClickMessage(){
    var id=this.data.bookDetail.id
    wx.navigateTo({
      url: '/pages/message/message?book_id='+id,
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取图书id
    var that=this
    var id=options.id
    this.getBookDetailIndo(id)
    this.getStarStatus(id)
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

  }
})