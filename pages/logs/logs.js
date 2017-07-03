//logs.js
var app = getApp()
Page({
  data: {
    logs: [],
    userInfo:{},
    orderMessgae:'暂无订单，请检查是否绑定账号',
  },
  clickAccount: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onShow: function () {
    var that = this
    //如果用户登陆，获取订单信息
    try {
      var value = wx.getStorageSync('loginSign')
      if (value) {
        that.setData({
          'orderMessage': '您当前没有订单'
        })
      }
      else{
        that.setData({
          'orderMessage': '您当前尚未登陆'
        })
      }
    } catch (e) {
      that.setData({
        'orderMessage': '您当前尚未登陆'
      })
      // Do something when catch error
    }
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      wx.hideLoading()
    })
  }
})
