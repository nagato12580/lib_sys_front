// components/book-sencond-type/book-second-type.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    sencondList:'',

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getBookType(e){
      //获取当前点击事件的index
      var index=e.currentTarget.dataset.index;
      //触发自定义方法，传送给父组件type_id，再在父组件中发起请求获取该类别下的书籍列表
      this.triggerEvent('syncType', {type_id:this.data.sencondList[index].id})
    },

  }
})