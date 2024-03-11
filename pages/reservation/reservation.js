// pages/reservation/reservation.js
var func = require("../../utils/function.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    checkSelected: '',
    nextDay:'',
    list: ['黑翅土白蚁', '黄翅大白蚁', '台湾乳白蚁', '黑胸散白蚁' ],
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var nextDay=func.getNextFormattedDate()
    this.setData({
      nextDay:nextDay

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
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
    //多选框获取选中的值
    getSelectBox: function(e) {
      // 打印选中项
      console.log("11111111:", e.detail.value)
      this.setData({
          checkSelected: e.detail.value
      })
  }
})