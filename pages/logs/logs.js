//logs.js
var app = getApp()
Page({
  data: {
    logs: [],
    userInfo:{}
  },
  clickAccount: function(){
    wx.navigateTo({
      url: '../login/login',
    })
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
