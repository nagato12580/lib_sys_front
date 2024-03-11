// app.js
// var Apipi = require("./apis/api.js"); //引入apijs

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    userInfo: null,
    //全局url
    baseUrl:"http://192.168.1.105:8000",
    jwt: null,//存储token
    access_token:null,
    account_id:null

  },
  login: function(e) {
    var userinfo = e
    // 登录部分代码
    var that = this;
    wx.login({
      // 调用 login 获取 code
      success: function(res) {
        var code = res.code;
        try {
          that.globalData.userInfo = userinfo.detail.userInfo;
          var encryptedData = userinfo.detail.encryptedData || 'encry';
          var iv = userinfo.detail.iv || 'iv';
        } catch (e) {
          return false
        }
        wx.request({ // 发送请求 获取 jwt
          url: api_url.login,
          header: {
            Authorization: 'JWT' + that.globalData.access_token,
          },
          data: {
            username: encryptedData,
            password: iv,
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
              wx.setStorage({
                key: "jwt",
                data: res.data.token
              });
              that.globalData = res.data
              that.globalData.jwt = res.data.token
              that.globalData.access_token = res.data.token;
              that.globalData.account_id = res.data.sub;
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
          fail: function(res) {}
        })
      }
    })

  },
  register: function(e) {
    // 注册代码
    var that = this;
    var userinfo = e
    wx.login({ // 调用登录接口获取 code
      success: function(res) {
        var code = res.code;
        try {
          that.globalData.userInfo = userinfo.detail.userInfo;
          var encryptedData = userinfo.detail.encryptedData || 'encry';
          var iv = userinfo.detail.iv || 'iv';
        } catch (e) {
          return false
        }
        wx.request({ // 请求注册用户接口
          url: api_url.Registered,
          header: {
            // Authorization: config.basic_token
          },
          data: {
            username: encryptedData,
            password: iv,
            code: code,
          },
          method: "POST",
          success: function(res) {
            if (res.statusCode == 201) {
              that.login(userinfo);
            }
            if (res.statusCode == 401) {
              that.register(userinfo);
            }
          },
          fail: function(res) {}
        })

      }
    })

  }

})

