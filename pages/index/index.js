
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
    recommendArray: [],
    followArray: [],
    freeArray: [],
    secondReommendArray: [],
  },
  testAction(){

  },
  //事件处理函数
  onLoad: function () {
    this.testAction()
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([netWork.getMainThemeList(), netWork.getSpecialPriceList(true), netWork.getRecommendList(true), netWork.getFollowTravleList(true), netWork.getFreeTravelList(true)]).then(([data2, data3, data4, data5, data6]) => {
      // netWork.loginWithLeanCloud()
      wx.hideLoading()
      wx.getSystemInfo({
        success: function (res) {
          wx.hideLoading()
          let myDealArray = []
          data3.forEach(obj => {
            obj.attributes.id = obj.id
            myDealArray.push(obj.attributes)
          })

          let recommendArray = []
          let secondReommendArray = []
          let recomLength = data4.length
          data4.forEach((obj, idx) => {
            obj.attributes.id = obj.id
            recommendArray.push(obj.attributes)
            secondReommendArray.push(obj.attributes)

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
            dataArray: [],
            followArray: isFollowArray,
            freeArray: isFreeArray,
            // imageArray: data1,
            specialPriceArray: myDealArray,
            recommendArray: recommendArray,
            secondReommendArray: secondReommendArray,
          });

        }

      });
    })

  },
  //点击更多特价
  clickMoreSpecialPriceList(e) {
    wx.navigateTo({
      url: `../specialList/sepicalList?name=isSpecialPrice&title=特价`,
    })
  },
  clickMoreFree() {
    wx.navigateTo({
      url: `../itemList/itemList?type=5c0fa55a44d904005f481911&title=贵州旅游`,
    })
  },
  clickMoreRecommend() {
    wx.navigateTo({
      url: `../itemList/itemList?type=5bfd42f844d904005f2595a8&title=北京旅游`,
    })
  },
  clickMoreFollow() {
    wx.navigateTo({
      url: `../itemList/itemList?type=5c061a63303f39005f3111a7&title=海南旅游`,
    })
  },
  clickImageidx(e) {
    var idx = e.currentTarget.dataset.type
    let naviTitle = e.currentTarget.dataset.title
    // wx.navigateTo({
    //   url: `../itemList/itemList?type=${idx}&title=${naviTitle}`,
    // })
    wx.navigateTo({
      url: '../theme/theme',
    })

  },
  allIslandsClick(e) {
    wx.navigateTo({
      url: '../islands/islands',
    })
  },
  clickRecommenItem(e) {

    let id = e.currentTarget.dataset.id
    let phone = netWork.getCurrentUserPhone()
    wx.navigateTo({
      // url: '../detail/detail?detailId=' + id,
      url:`../detail/detail?detailId=${id}&&phone=${phone}`
    })
  },
  clickSpecialPrice(e) {
    // let id = e.currentTarget.dataset.id

    // wx.navigateTo({
    //   url: '../detail/detail?detailId=' + id,
    // })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '星旅游',
      path: '/pages/index/index',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})
