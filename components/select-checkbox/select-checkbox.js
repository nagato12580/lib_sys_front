// pages/select-checkbox/select-checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      label: String, // 输入框标签
      place: String, // 输入框提示
      list: Array, // 选择器 选项
      checkSelected: { // 选择器 选项数组中 对象的value的默认key
          type: String,
          value: ' '
      },
      reset:{ // 判断是否刷新当前已选中项目
        type: Boolean,
        value: false
    },
    //初始时间段列表
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
  },
  // 监听传入的变量,当传入的值发生变化时,触发方法
  observers: {
      // 'checkSelected': function (val) {
      //     // val=> 就是父组件传入组件中的 tabsList 数据
      //     console.log('???:', val)
      // },
      'reset':function (val) {
        // val=> 就是父组件传入组件中的 tabsList 数据
        // var checkSelected=this.data.checkSelected
        // const selectedArray = checkSelected.split(',');
        // var list=this.data.list
        
        // var indexes = selectedArray.map(item => list.indexOf(item))
        // console.log(indexes)
        // var checkbox=''
        // for(var i=0;i<indexes.length;i++){
        //   var index =indexes[i]
        //   checkbox = this.selectComponent(`.checkboxes-${index}`)
        //   checkbox.toggle()
        // }
        //清空已选中项
        this.triggerEvent('sync', {  // 传递到组件外事件 ， 返回当前选中项 对象
          value: []
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
      icon:'arrow-down',  // 下拉箭头
      show: false,
      result: [],
  },
  /**
  * 组件的方法列表
  */
  methods: {
     // 取消
      cancel() {
          this.setData({ show: false })
      },
      // 确定
      confirm() {
          this.setData({ show: false })
          var checkSelected=this.data.checkSelected
          const selectedArray = checkSelected.split(',');
          console.log(selectedArray)
          this.triggerEvent('sync', {  // 传递到组件外事件 ， 返回当前选中项 对象
              value: selectedArray
          })
      },

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
  },
  attached: function () {
      // console.log("父组件传过来:", this.properties.checkSelected) // 可以获取父组件传过来的值
  },
})