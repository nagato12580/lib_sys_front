import { request } from './request'
// let host = 'http://192.168.1.80:8001'

// let host = 'http://127.0.0.1:8001'

// let host = 'http://192.168.4.117:8001'

let host = 'http://192.168.87.36:8000/api'

// 获取热门书籍
var PopularBooklist=host + '/borrow/get_popular'
//借阅相关url
var Borrow = host + '/borrow'
//书籍分类相关url
var Category=host + '/category'
//书籍相关url
var Book=host + '/book'

//轮播图相关url
var Swiper=host + '/swiper'

//公告相关url
var Notice=host + '/notice'


module.exports = {
  borrow:Borrow,
  popularBooklist:PopularBooklist,
  category:Category,
  swiper:Swiper,
  notice:Notice,
  book:Book,

}