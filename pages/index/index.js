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
    specialPriceArray: [],
    recommendArray:[],
    followArray:[],
    freeArray:[],
  },

  //事件处理函数
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([netWork.getMainThemeList(), netWork.getSpecialPriceList(), netWork.getRecommendList(), netWork.getFollowTravleList(), netWork.getFreeTravelList()]).then(([data2, data3,data4,data5,data6]) => {

      netWork.loginWithLeanCloud()
      wx.hideLoading()
      wx.getSystemInfo({
        success: function (res) {
          wx.hideLoading()
          let myDealArray = []
          data3.forEach(obj=>{
          obj.attributes.id = obj.id
          myDealArray.push(obj.attributes)
          })

          let recommendArray = []
          data4.forEach(obj => {
            obj.attributes.id = obj.id
            recommendArray.push(obj.attributes)
          })

          let isFollowArray = []
          data5.forEach(obj => {
            obj.attributes.id = obj.id
            isFollowArray.push(obj.attributes)
          })

          let isFreeArray = []
          data6.forEach(obj => {
            obj.attributes.id = obj.id
            isFreeArray.push(obj.attributes)
          })
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight,
            dataArray: data2,
            followArray: isFollowArray,
            freeArray: isFreeArray,
            // imageArray: data1,
            specialPriceArray:myDealArray,
            recommendArray:recommendArray,
          });

        }

      });
    })

  },

  clickImageidx(e) {
    var idx = e.currentTarget.dataset.type
    let naviTitle = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../itemList/itemList?type=${idx}&title=${naviTitle}`,
    })
  },
  clickRecommenItem(e){

    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../detail/detail?detailId=' + id,
    })
  },
  clickSpecialPrice(e){
    let id = e.currentTarget.dataset.id
    
    wx.navigateTo({
      url: '../detail/detail?detailId=' + id,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '超想去旅行',
      path: '/pages/index/index',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})
