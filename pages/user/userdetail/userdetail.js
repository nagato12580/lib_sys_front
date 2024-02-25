// pages/user/userdetail/userdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    checkSelectedFaculty: '',//选中学院名称
    checkSelectedFacultyID:null,//选中学院的ID
    list: ['黑翅土白蚁', '黄翅大白蚁', '台湾乳白蚁', '黑胸散白蚁' ],//学院列表

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

  //自定义函数
  // 获取选中的值
  getSelectBox: function(e) {
    // 打印选中项
    console.log("11111111:", e.detail.value)
    this.setData({
      checkSelectedFaculty: e.detail.value
    })
  }
})