// pages/user/userdetail/userdetail.js
import Notify from '@vant/weapp/notify/notify';
var Request = require('../../../apis/request.js');
var api = require('../../../apis/api.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName:'',
    telephone:'',
    myGrade:'',
    myFacult:'',
    myMajor:'',
    checkSelectedFaculty: '',//选中学院名称
    checkSelectedFacultyID:null,//选中学院的ID
    // 下拉框选项组件
    facultList:[],
  majorList:[],
  gradeList:[
    {code:'1',name:'2020级'},
    {code:'2',name:'2021级'},
    {code:'3',name:'2022级'},
    {code:'4',name:'2023级'}
]

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyInfoDetail();
    this.getFacultList();
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
      // 设置定时器设置data信息
      var facultList='';
      var myFacult='';
      var instance = setInterval(()=>{
        facultList=this.data.facultList
        myFacult=this.data.myFacult
        //数据装载完毕，获取专业列表，关闭定时器
        if(myFacult&&facultList){
         for (var i = 0; i < facultList.length; i++) {
           if(facultList[i].name==myFacult){
             var faculty_id = facultList[i].id
             var that = this
             Request.request(api.getFacultMajor,{'faculty_id':faculty_id},'GET').then(
               function(res){
                 that.setData({
                   majorList:res.data
                 })
             })
           }
         }
          clearInterval(instance)
        }
      }, 1000)
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
  //修改用户名，这里是双向绑定，输入框更改RealName会随之更改
  bindinputRealName(event) {
    let realName = event.detail.value;
    this.setData({
      realName: realName,
    });
  },
  bindinputTelephone(event) {
    let telephone = event.detail.value;
    this.setData({
      telephone: telephone,
    });
  },
// 获取选中的项目
  getSelectFacult(e) {
  //获取选中学院之后，发送请求获取该学院的专业
  console.log(e.detail.value);
  this.setData({
    myFacult:e.detail.value.name
  })
  var faculty_id = e.detail.value.id
  var that = this
  Request.request(api.getFacultMajor,{'faculty_id':faculty_id},'GET').then(
    function(res){
      console.log(res)
      that.setData({
        majorList:res.data
      })
  })

  },
  getSelectGrade(e) {
    // 打印选中项
  console.log(e.detail.value);
  this.setData({
    myGrade:e.detail.value.name
  })
  },
  getSelectMajor(e) {
    // 打印选中项
  console.log(e.detail.value);
  this.setData({
    myMajor:e.detail.value.name
  })
  },
  //获取学院列表
  getFacultList(){
    var that =this
    Request.request(api.facult,{},'GET').then(
      function(res){
        console.log(res)
        that.setData({
          facultList:res.data
        })
    })
  },
  //获取我的详细信息
  getMyInfoDetail(){
    var that =this
    Request.request(api.getUserInfo,{},'GET').then(
      function(res){
        that.setData({
          myFacult:res.data.faculty_title,
          myGrade:res.data.grade_name,
          myMajor:res.data.major_title,
          realName:res.data.realname,
          telephone:res.data.telephone
        })
    })
  },
  //信息提交保存
  toComfirmInfo(){
    var data={
      'myFacult':this.data.myFacult,
      'myGrade':this.data.myGrade,
      'myMajor':this.data.myMajor,
      'realName':this.data.realName,
      'telephone':this.data.telephone
    }
    Request.request(api.toComfirmInfo,data,'POST').then(
      function(res){
        if(res.statusCode==200){
          //弹窗提示，保存成功
          Notify({ type: 'success', message: '保存成功' })

        }
        else{
          //弹框提示，缺少参数
          Notify({ type: 'warning', message: '请填写完整' })
        }

    })

  }

  
})