//index.js
//获取应用实例
var app = getApp()
var netWork = require('../../utils/network.js')
var localData = [
  {
    imageUrl:'http://omh0qz95c.bkt.clouddn.com/timg%20%281%29.jpeg',
    name:'名称1',
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
  imageArray = [{
    imageUrl:'http://omh0qz95c.bkt.clouddn.com/101499175264_.pic.jpg'
  },
    {
      imageUrl: 'http://omh0qz95c.bkt.clouddn.com/111499175319_.pic.jpg'
    },
    {
      imageUrl: 'http://omh0qz95c.bkt.clouddn.com/91499175246_.pic.jpg'
    },
    {
      imageUrl: 'http://omh0qz95c.bkt.clouddn.com/81499175132_.pic.jpg'
    }
  ]
Page({
  data: {
   dataArray:localData,
   imageArray:imageArray,
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
    /** 
   * 获取系统信息 
   */
    netWork.loginWithLeanCloud()
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    }); 
  },

  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    
    var that = this;

    if (this.datacurrentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  clickImage(idx){

  },
})
