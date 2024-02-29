import { request } from './request'
// let host = 'http://192.168.1.80:8001'

// let host = 'http://127.0.0.1:8001'

// let host = 'http://192.168.4.117:8001'

let host = 'http://192.168.1.108:8000'

// 获取热门书籍
var PopularBooklist=host + '/api/borrow/get_popular'
//借阅相关url
var Borrow = host + '/api/borrow/'
//书籍分类相关url
var Category=host + '/api/category'
//书籍相关url
var Book=host + '/api/book'

//轮播图相关url
var Swiper=host + '/api/swiper'

//公告相关url
var Notice=host + '/api/notice'

//登录url
var login = host+'/mini_login/'

//上传头像
var upLoad = host+'/api/upload/upload_file/'

//修改头像和用户名接口 
var upDateInfo = host+'/api/account/update_userinfo/'
//获取当前登录用户详细信息
var getUserInfo = host+'/api/account/get_userinfo/'
//个人详细信息确认接口
var toComfirmInfo = host+'/api/account/comfirm_info/'

//图书收藏
var collectBook = host+'/api/collection/'
var getStar = host+'/api/collection/get_status/'
var cancelStar = host+'/api/collection/cancel/'

//学院、班级接口get_facult_major
var facult = host+'/api/faculty/'
//专业接口
var getFacultMajor = host+'/api/major/get_facult_major/'
module.exports = {
  borrow:Borrow,
  popularBooklist:PopularBooklist,
  category:Category,
  swiper:Swiper,
  notice:Notice,
  book:Book,
  login:login,
  upLoad:upLoad,
  upDateInfo:upDateInfo,
  getUserInfo:getUserInfo,
  collectBook:collectBook,
  getStar:getStar,
  cancelStar:cancelStar,
  facult:facult,
  getFacultMajor:getFacultMajor,
  toComfirmInfo:toComfirmInfo

}