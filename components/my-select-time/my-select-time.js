var util = require('../../utils/function.js')
 
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
 
  /**
   * 组件的初始数据
   */
  data: {
    timeArray: [
      {'id':0,'time':"时间段"},
      {'id':1,'time':"8:00-9:00"},
      {'id':2,'time':"9:00-10:00"},
      {'id':3,'time':"10:00-11:00"},
      {'id':4,'time':"11:00-12:00"},
      {'id':5,'time':"12:00-13:00"},
      {'id':6,'time':"13:00-14:00"},
      {'id':7,'time':"14:00-15:00"},
      {'id':8,'time':"15:00-16:00"},
      {'id':9,'time':"16:00-17:00"},
      {'id':10,'time':"17:00-18:00"},
      {'id':11,'time':"18:00-19:00"},
      {'id':12,'time':"19:00-20:00"},
      {'id':13,'time':"20:00-21:00"},
      {'id':14,'time':"21:00-22:00"},
      {'id':15,'time':"22:00-23:00"},
    ],
    seatList:[
      {'id':0,'num':"一号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':1,'num':"2号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':2,'num':"3号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':3,'num':"4号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':4,'num':"5号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':5,'num':"5号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':6,'num':"6号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':7,'num':"7号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':8,'num':"8号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},
      {'id':9,'num':"9号座位",'usedList':[0,0,1,0,1,0,0,0,0,0,1,1,0,1,1]},

    ]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
  },
 
})