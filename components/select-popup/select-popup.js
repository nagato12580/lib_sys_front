// pages/select-popup/select-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String, // 输入框标签
    place: String, // 输入框提示
    columns: Array, // 选择器 选项
    valueKeyName:{ // 选择器 选项数组中 对象的value的默认key
      type: String,
      value: 'text'
    },
    selectedValue: {
      // 类型
      type: String,
      // 默认值
      value: ''
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    popShow: false,
    icon:'arrow-down'  // 下拉箭头
  },
  
  // 监听传入的变量,当传入的值发生变化时,触发方法
  observers: {
    'selectedValue': function (val) {
      //设置输入框为
      this.setData({
        value: val,  // 设置输入框为选择器选中的值
      })
    }
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击输入框触发
    tap() {
      this.setData({
        popShow: true,
        icon:'arrow-up'
      })
    },
    // 点击取消
    onCancel() {
      this.setData({
        popShow: false,
        icon:'arrow-down'
      })
    },
    // 点击确认
    onConfirm(e) {
      let pic, value
      pic = this.selectComponent('#picker')
      // 获取当前选中项的值  改值为对象
      value = pic.getValues()
      // console.log(e)
      this.setData({
        value: value[0][this.data.valueKeyName],  // 设置输入框为选择器选中的值
      })
      this.triggerEvent('confirm', {  // 传递到组件外事件 ， 返回当前选中项 对象
        value: value[0],
        index:e.detail.index
      })
      this.onCancel()
    }
  }
})
