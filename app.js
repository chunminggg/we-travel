//app.js
const AV = require('./libs/av-weapp-min.js')
var mta = require('./libs/mta_analysis.js')
AV.init({
  appId: 'qDUQr0EmHHn3HOIqb3Re0IHa-gzGzoHsz',
  appKey: 'w2TRHW0KHUkt5mVHtgp9wa2s',
})

App({
  onLaunch: function(options) {
    //调用API从本地缓存中获取数据

    mta.App.init({
      "appID": "500512368",
      "eventID": "500512369",
      "statShareApp": true,
      "lauchOpts": options,
    });
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
