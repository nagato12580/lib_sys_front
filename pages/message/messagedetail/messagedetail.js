// pages/message/messagedetail/messagedetail.js
var Request = require("../../../apis/request.js");
var Api = require("../../../apis/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    messageIid:'',
    commentListLength:'',
    commentList:[],
    messageTheme:'',
    messageContent:'',
    messageDate:'',
    toInput:false,
    //用于发送回复的接口信息
    comment_content:'',
    parent_id:'',
    reply_to_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var message_id=options.message_id
    let user_id = wx.getStorageSync('userInfo').id;
    this.setData({
      user_id:user_id,
      messageIid:message_id
    })
    //发送请求获取帖子主题和内容
    var that = this
    Request.request(Api.bookMessage,{'id':message_id},'GET').then(function(res){
      if(res.statusCode==200){
        that.setData({
          messageTheme:res.data[0].title,
          messageContent:res.data[0].content,
          messageDate:res.data[0].created_time,
        })
      }
    })
    console.log("获取主题")

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
    this.getMessageComment()

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
  //获取留言评论
  getMessageComment(MessageId){
    var that =this
    var messageIid=this.data.messageIid
    console.log(messageIid)
    Request.request(Api.comment,{'message_id':messageIid},'GET').then(function(res){
      var len=res.data.length
      that.setData({
        commentListLength:len,
        commentList:res.data
      })
    })
  },
  //获取二级评论列表
  toCommentReply(e){
    //设置为显示
    var index=e.currentTarget.dataset.index
    var old_val=this.data.commentList[index].childrens_show
    this.data.commentList[index].childrens_show=!old_val
  },
  //点击事件，点击之后唤起键盘
  toInputReply(e){
    //获取父评论id
    var parent_id=e.currentTarget.dataset.parent_id
    var reply_to_id=e.currentTarget.dataset.comment_user_id
    this.setData({
      toInput:true,
      parent_id:parent_id,
      reply_to_id:reply_to_id
    })
  },
  bindContentInput(e) {
    const content = e.detail.value;
    this.setData({
      comment_content:content
    })
  },
  toPostReply(){
        //新增二级评论
        var that=this
        var message_id=this.data.messageIid
        var parent_id=this.data.parent_id
        console.log("二级评论"+parent_id+reply_to_id)
        var reply_to_id=this.data.reply_to_id
        var comment_content=this.data.comment_content
        console.log(parent_id)
        console.log(reply_to_id)
        if(comment_content==''){
          wx.showToast({
            icon:'none',
            title: '内容不能为空',
          })
        }else{
          Request.request(Api.comment,{
            'message_id':message_id,
            'parent_id':parent_id,
            'reply_to_id':reply_to_id,
            'comment_content':comment_content
          },'POST').then(
            function(res){
              if(res.statusCode==201){
                wx.showToast({
                  icon:'success',
                  title: "回复成功",
                })
                //回复成功后请求新数据，重新渲染页面数据
                that.getMessageComment()
                //清空输入框的数据
                that.setData({
                  comment_content:'',
                  parent_id:'',
                  reply_to_id:''
                })
              }
          })

        }

  },
  //删除评论
  toDeleteComment(e){
    var comment_id=e.currentTarget.dataset.id
    console.log(comment_id)
    var that=this
    var messageId=this.data.messageIid
    Request.request(Api.deleteComment,{"comment_id":comment_id},'POST').then(
      function(res){
        //删除成功刷新页面
        if(res.statusCode==200){
          that.getMessageComment(messageId)
        }
    })


  }
})