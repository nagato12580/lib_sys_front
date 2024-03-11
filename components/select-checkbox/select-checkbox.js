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
          value: 'text'
      }
  },
  // 监听传入的变量,当传入的值发生变化时,触发方法
  // observers: {
  //     'checkSelected': function (val) {
  //         // val=> 就是父组件传入组件中的 tabsList 数据
  //         console.log('???:', val)
  //     }
  // },
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
          this.triggerEvent('sync', {  // 传递到组件外事件 ， 返回当前选中项 对象
              value: this.data.checkSelected
          })
      },

      showPopup() {
          this.setData({ show: true })
      },
      onClose() {
          this.setData({ show: false })
      },
      onChange(event) {
          // console.log('event:', event)
          this.setData({
              result: event.detail,
              checkSelected: event.detail.join(',')
          })
          // console.log('this.data.checkSelected:', this.data.checkSelected)
      },
      toggle(event) {
          const { index } = event.currentTarget.dataset
          const checkbox = this.selectComponent(`.checkboxes-${index}`)
          checkbox.toggle()
      },
      noop() {},  
  },
  attached: function () {
      console.log("父组件传过来:", this.properties.checkSelected) // 可以获取父组件传过来的值
  },
})