// pages/user/my_reservation/my_reservation.js
var Request = require("../../../apis/request.js")
var Api = require("../../../apis/api.js")
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    no_used_seat:[],//未使用的座位列表
    used_seat:[],//已使用的座位列表
    show:false,
    periodList:[],
    periodIdList:[],
    timeArray: [
      "8:00-9:00",
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00",
      "21:00-22:00",
      "22:00-23:00"
    ]
  },
  //控制弹出层
  showPopup() {
    this.setData({ show: true });
  },
  //控制弹出层
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyReservationSeatList()
    this.getNextDate()

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
  //自定义方法列表
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  //获取当前用于的预约列表
  getMyReservationSeatList(){
    var that=this
    Request.request(Api.myReservation,{},'GET').then(
      function(res){
        if(res.statusCode==200){
          that.setData({
            no_used_seat:res.data.no_used_seat,
            used_seat:res.data.used_seat
          })


        }
        console.log(res)
    })
  },
  //已废弃
  toUseSeat(e){
    var seat_id=e.currentTarget.dataset.seat_id
    console.log(seat_id)
    var index=e.currentTarget.dataset.index
    var no_used_seat=this.data.no_used_seat
    var that=this
        // 允许从相机和相册扫码
     wx.scanCode({
       onlyFromCamera:true,
       scanType:['qrCode'],
       success:res=>{
          var scan_seat_id=res.result
          console.log(scan_seat_id)
          if(seat_id==scan_seat_id){
            console.log("座位匹配")
            //判断当前是否在预约时间段内
            //1.获取当前座位预约的时间段
            var period_list=no_used_seat[index].period_id
            console.log(period_list)
            //2.获取当前的时间
            // 获取当前时间的时和分
            var currentTime = new Date();
            var hour = currentTime.getHours();
            var minute = currentTime.getMinutes();
            // 获取当前时间对应的id
            var now_period_id=hour-8
            //预约时间段包含当前时间
            if(period_list.includes(now_period_id)){
              console.log("当前时间在预约时间段内")
              //判断是否超出预约时间段15分钟，若超出则取消该时间段的预约
              if(minute>15){
                that.cancelReservation('2024-03-15',seat_id,now_period_id)
                that.getMyReservationSeatList()
              }
              else{
                that.useSeatReservation('2024-03-15',seat_id,now_period_id)
                that.getMyReservationSeatList()
              }



            
            }
            console.log("当前时间：", hour + ":" + minute);
          }
       },
       fail:err=>{
         console.log(err);
       }
     })
    
  },
  //取消某一时间段的预约
  cancelReservation(appointment_date,seat_id,period_id){
    Request.request(Api.cancelReservation,{
      'appointment_date':appointment_date,
      'seat_id':seat_id,
      'period_id':period_id
    },'POST').then(
      function(res){
        console.log(res)
        if(res.statusCode==200){
          // 成功通知
          Notify({ type: 'success', message: '该时间段的预约已取消' });
        }
      }
    )
  },
  //启用某一座位的使用
  useSeatReservation(appointment_date,seat_id,period_id){
    Request.request(Api.useReservation,{
      'appointment_date':appointment_date,
      'seat_id':seat_id,
      'period_id':period_id
    },'POST').then(
      function(res){
        console.log(res)
        if(res.statusCode==200){
          // 成功通知
          Notify({ type: 'success', message: '操作成功' });
        }
      }
    )


  },
  //触发取消按钮
  toCancel(event){
    this.setData({
      show:true
    })
    var index=event.currentTarget.dataset.index
    console.log()
    var periodList=this.data.no_used_seat[index].period
    var periodIdList=this.data.no_used_seat[index].period_id
    var toCancelDate=this.data.no_used_seat[index].appointment_date
    var totoCancelSeatID=this.data.no_used_seat[index].seat_id
    this.setData({
      periodList:periodList,
      periodIdList:periodIdList,
      toCancelDate:toCancelDate,
      totoCancelSeatID:totoCancelSeatID
    })
    //设置要取消的日期和作为id
    
  },
  // 取消,关闭弹出层
  cancel() {
        this.setData({ show: false })
    },
  // 确定
  confirm() {
        this.setData({ show: false })
        var checkSelected=this.data.checkSelected
        const selectedArray = checkSelected.split(',');
        var timeArrat=this.data.timeArray
        console.log(selectedArray)
        //获取到需要取消时间段的id
        const indexes = selectedArray.map(item => timeArrat.indexOf(item));
        //获取需要取消的日期和座位号
        var toCancelDate=this.data.toCancelDate
        var totoCancelSeatID=this.data.totoCancelSeatID
        //发送请求取消预约
        var that=this
        Request.request(Api.cancelReservation,{'period_ids':indexes,'appointment_date':toCancelDate,'seat_id':totoCancelSeatID},'POST').then(
          function(res) {
            //取消成功
            if(res.statusCode==200){
              //重新请求页面数据（刷新页面）
              Notify({ type: 'success', message: '取消成功' });
              that.getMyReservationSeatList()
            }//取消失败
            else{
              Notify({ type: 'warning', message: '取消失败' });
            }
        })



        
        
    },

//多选框配置
showPopup() {
  this.setData({ show: true })
},
onClose() {
  this.setData({ show: false })
},
onChange(event) {
  this.setData({
      result: event.detail,
      checkSelected: event.detail.join(',')
  })
  // console.log('this.data.checkSelected:', this.data.checkSelected)
},
toggle(event) {
console.log(event)
  const { index } = event.currentTarget.dataset
  const checkbox = this.selectComponent(`.checkboxes-${index}`)
  checkbox.toggle()
},
noop() {},
getNextDate(){
  // 创建一个 Date 对象表示当前日期
var currentDate = new Date();

// 获取当前日期的天数并加一
var nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  // 获取下一天的年、月、日
  var year = nextDate.getFullYear();
  var month = nextDate.getMonth() + 1; // 月份从 0 开始，需要加一
  var day = nextDate.getDate();
  // 将下一天的年、月、日拼接成字符串
  var nextDateString = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  this.setData({
    nextDate:nextDateString
  })
}
  
})