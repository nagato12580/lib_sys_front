//在这个 JS 文仵中，专门来创建 store 的实例对象

import {observable,action} from 'mobx-miniprogram'
export const store = observable({
  //数据字段
  numA:1,
  numB:2,
  activeTabBarIndex: 0,
  baseUrl:'192.168.137.1:8000',
  //定义计算属性 必须get方法修饰，是只读的
  get sum(){
    return this.numA+this.numB
  },
  //actions方法，用于修改store中的数据
  updateNum1:action(function(step){
    this.numA+=step
  }),
  updateActiveTabBarIndex:action(function(index){
    this.activeTabBarIndex=index
  })


})