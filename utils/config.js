var host = "你的域名";//请求域名
var config={
  host,
  login_url:host+"api/login/",//登录url
  article_url:host+"api/article/",//文章url
  category_url:host+"api/category/",//分类url
}
module.exports=config//输出配置