//index.js
//获取应用实例
var app = getApp()
var netWork = require('../../utils/network.js')
var localData = [
  {
    imageUrl: 'http://omh0qz95c.bkt.clouddn.com/timg%20%281%29.jpeg',
    name: '名称1',
  },
  {
    imageUrl: 'http://omh0qz95c.bkt.clouddn.com/bali1.jpg',
    name: '名称2',
  },
  {
    imageUrl: 'http://omh0qz95c.bkt.clouddn.com/bali4.jpg',
    name: '名称3',
  },
],
  imageArray = [
  ]
Page({
  data: {
    dataArray: [],
    imageArray: imageArray,
    /** 
    * 页面配置 
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
  },

  //事件处理函数
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([netWork.getMainScroll(), netWork.getMainThemeList()]).then(([data1,data2])=>{
        netWork.loginWithLeanCloud()
        wx.hideLoading()
       wx.getSystemInfo({
      success: function (res) {
        wx.hideLoading()

        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          dataArray:data2,
          imageArray: data1
        });
      }

    }); 
    })
    
  },

  clickImageidx(e) {
    var idx = e.currentTarget.dataset.type 
    let naviTitle = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../itemList/itemList?type=${idx}&title=${naviTitle}` ,
    })
  },
})
