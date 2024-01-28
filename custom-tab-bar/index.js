import { action } from "mobx-miniprogram";
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../store/store'

// custom-tab-bar/index.js
Component({
  options:{
    styleIsolation:'shared'
  },
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      active:'activeTabBarIndex'
    },
    actions:{
      updateActive:'updateActiveTabBarIndex'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

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
    onChange(event) {
      // event.detail 的值为当前选中项的索引,这里更新全局store的值
      this.updateActive(event.detail)
      var url=''
      switch (event.detail) {
        case 0:
          url='/pages/home/home';
          break;
        case 1:
          url='/pages/book/book';
          break;  
        case 2:
          url='/pages/borrow/borrow';
          break;    
        case 3:
          url='/pages/user/user';
          break;  
        default:
          break;
      }
      wx.switchTab({
        'url': url,
      })
    },

  }
})