// components/book-list/book-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    bookList:[]
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
    getBookId(e){
      //获取图书的id
      var index=e.currentTarget.dataset.index
      var book_id=this.properties.bookList[index].id
      //将当前点击的图书id传递给父组件
      this.triggerEvent("clickBookId",book_id)

    },
  }
  // observers:{
  //   'bookList': function(val){

  //   }

})