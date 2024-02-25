var api_url = require("../apis/api.js"); //引入apijs
var app = getApp();
function login(e){
  var userinfo = e
  // 登录部分代码
  var that = this;
  wx.login({
    // 调用 login 获取 code
    success: function(res) {
      var code = res.code;
      wx.request({ // 发送请求 获取 jwt
        url: api_url.login,
        data: {
          code: code,
        },
        method: "POST",
        success: function(res) {
          if (res.statusCode === 200) {
            // 得到 jwt 后存储到 storage，
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            //缓存jwt
            wx.setStorage({
              key: "jwt",
              data: res.data.data.token
            });
            console.log(res.data)
            //缓存userInfo
            var userInfo=new Object();
            userInfo={
              'id':res.data.data.account_id,
              'username':res.data.data.username,
              'wx_photo':res.data.data.wx_photo
            }
            wx.setStorageSync('userInfo', userInfo)
            app.globalData.userInfo = userInfo
            app.globalData.jwt = res.data.data.token
            app.globalData.access_token = res.data.data.token;
            app.globalData.account_id = res.data.data.account_id;
            console.log(app.globalData)
          } else if (res.statusCode === 400) {
            // 如果没有注册调用注册接口
            that.register(userinfo);
          } else {
            // 提示错误信息
            wx.showToast({
              title: res.data.text,
              icon: 'success',
              duration: 2000
            });
          }
        },
        fail: function(res) {
          console.log("登陆失败")
        }
      })
    }
  })

}
module.exports = {
  login: login
}