// pages/reservation/reservation.js
var func = require("../../utils/function.js")
var Request = require("../../apis/request.js");
var Api = require("../../apis/api.js");
import Dialog from '@vant/weapp/dialog/dialog';
//引入自定义监听器
import { setWatcher } from '../../utils/watch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    checkSelected: '',
    nextDay:'',
    floorList: [
      {code:'0',name:'负一楼'},
      {code:'1',name:'一楼'},
      {code:'2',name:'二楼'},
      {code:'3',name:'三楼'},
      {code:'4',name:'四楼'},
      {code:'5',name:'五楼'},
  ],
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
  ],
  timeIndexs:[],//选中时间段的id列表
  floorID:'',//选中时间段的代码
  nextDayFloorSeatListDetail:[],
  nextDayFloorSeatList:[],
  toDayFloorSeatListDetail:[],
  avaliableList:[],//选择楼层座位后当前可用的时间段列表
  selectedSeatId:'',
  index:'',//当前座位在列表中的index
  reset:false,//是否刷新当前选中时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var nextDay=func.getNextFormattedDate()
    this.setData({
      nextDay:nextDay
    })
    this.getDate()
    this.getTodayOverview()

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
    this.getDate()
    this.getTodayOverview()
    //发送请求获取该楼层的可用座位列表
    this.getNextDayAvailableSeat(this.data.floorID)

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

  // 获取选中的时间段数组
  getSelectBox: function(e) {
    var selectedVal=e.detail.value
    var timeArray=this.data.timeArray
    //获取选中项的下标
    const timeIndexs = selectedVal.map(item => timeArray.indexOf(item));
    this.setData({
      checkSelected: e.detail.value,
      timeIndexs:timeIndexs
    })
  },

// 获取选中的楼层（下一天）
getSelectFloor: function(e) {
   var floorID=e.detail.value.code
  this.setData({
    floorID:floorID
  })
  //发送请求获取该楼层的可用座位列表
  this.getNextDayAvailableSeat(floorID)
},
//获取选中的楼层（当天）
getTodaySelectFloor: function(e) {
  var floorID=e.detail.value.code
 this.setData({
   floorID:floorID
 })
 //发送请求获取该楼层的可用座位列表
 this.getTodayAvailableSeat(floorID)
},

//根据楼层获取该楼层当天座位使用情况
getTodayAvailableSeat(floorID){
  var that=this
  var floor=this.data.floorID
  var todayDate=this.data.todayDate
  Request.request(Api.floorSeat,{'floor':floor,'appointment_date':todayDate},'GET').then(
    function(res){
      if(res.statusCode==200){
        that.setData({
          toDayFloorSeatListDetail:res.data.floorListDetail,
          toDayFloorSeatList:res.data.floorList
        })
      }
    })

},
//根据楼层ID获取下一天可用座位列表
getNextDayAvailableSeat(floorID){
  var that=this
  var floor=this.data.floorID
  var nextDay=this.data.nextDay
  Request.request(Api.floorSeat,{'floor':floor,'appointment_date':nextDay},'GET').then(
    function(res){
      if(res.statusCode==200){
        that.setData({
          nextDayFloorSeatListDetail:res.data.floorListDetail,
          nextDayFloorSeatList:res.data.floorList
        })
      }
    })

},
//根据选择座位获取可用时间段
selectPeriod(e){
  //获取当前选择座位的index
  var index=e.detail.index
  this.setData({
    index:index
  })
  //获取当前选择座位的id
  var selectedSeatId=e.detail.value.id
  this.setData({
    selectedSeatId:selectedSeatId
  })
  // this.getAvaliTimeList(index,selectedSeatId)
  //获取当前座位的使用情况列表
  var usedList=this.data.nextDayFloorSeatListDetail[index].usedList
  var timeList = this.data.timeArray
  //构造当前座位可预约的时间列表
  var avaliableList=[]
  for (let i = 0; i < usedList.length; i++) {
    if(usedList[i]==1){
      avaliableList.push(timeList[i])
    }
  }
  this.setData({
    avaliableList:avaliableList
  })
},
//更新当前座位的可预约时间列表
getAvaliTimeList(index,seatId){
    //获取当前座位的使用情况列表
    var usedList=this.data.nextDayFloorSeatListDetail[index].usedList
    var timeList = this.data.timeArray
    //构造当前座位可预约的时间列表
    var avaliableList=[]
    for (let i = 0; i < usedList.length; i++) {
      if(usedList[i]==1){
        avaliableList.push(timeList[i])
      }
    }
    console.log(avaliableList)
    this.setData({
      avaliableList:avaliableList
    })



},
//更新avaliableList
updateupAvaliableList(checkSelected){
  var avaliableList=this.data.avaliableList
  for(let i=0;i<checkSelected.length;++i){
    var key=checkSelected[0]
    // 查找特定值在数组中的索引
    var index = avaliableList.indexOf(key);
    // 如果找到了该值，就从数组中删除
    if (index !== -1) {
      avaliableList.splice(index, 1);
    }
    this.setData({
      avaliableList:avaliableList
    })
  }
},

//提交预约
toComfirmInfo(){
  //已选择的时间
  var selectedTimes=this.data.timeIndexs
  var selectedSeatId=this.data.selectedSeatId
  var appointment_date=this.data.nextDay
  var index = this.data.index
  var that=this
  var floorID=this.data.floorID
  Request.request(Api.reservation,{
    'seat_id':selectedSeatId,
    'time_list':selectedTimes,
    'appointment_date':appointment_date},'POST').then(
    function(res){
      if(res.statusCode==200){
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 500, // 悬浮框显示时间
          success: () => {
            //成功之后刷新表格数据
            that.getNextDayAvailableSeat(floorID)
            //设置当前
            that.setData({
              reset:true
            })
            // //更新当前可选择时间段列表
            // that.updateupAvaliableList(that.data.checkSelected)

          }
        });
      }
      else{
        console.log(res)
        //获取冲突的时间段列表
        var conflictList=res.data
        var message=""
        conflictList.forEach(function(item) {
          message+=" "+item
      });
      console.log(message)
      Dialog.alert({
        title: '时间段冲突',
        message: message+"已被预约，请重新选择",
      }).then(() => {
        // on close
      });

      }
    })
},
//获取今天和明天的日期
getDate(){
  // 获取今天的日期
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // 格式化日期为 YYYY-MM-DD
  // 获取明天的日期
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0]; // 格式化日期为 YYYY-MM-DD
  this.setData({
    todayDate:todayDate,
    tomorrowDate:tomorrowDate
  })
},
//获取当天楼层座位概览
getTodayOverview(){
  // 创建一个 Date 对象来表示当前时间
  const now = new Date();
  // 使用 getHours() 方法获取当前时间的小时数
  const currentHour = now.getHours();
  var today=this.data.todayDate
  var that=this
  Request.request(Api.floorOverview,{'hour':currentHour,'date':today},'GET').then(
    function(res){
      if(res.statusCode==200){
        that.setData({
          overviewTodayRes:res.data.res
        })
      }
  
  })

}


})