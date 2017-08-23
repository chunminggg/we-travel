//logs.js
var network = require('../../utils/network.js')
var app = getApp()
Page({
  data: {
    logs: [],
    userInfo: {},
    orderMessgae: '暂无订单，请检查是否绑定账号',
    isHasData: true,
    itemArray: [],
  },
  clickAccount: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onShow: function () {
    var that = this
    //如果用户登陆，获取订单信息

  },
  clickReserveItem(e) {
    var onlyId = e.currentTarget.dataset.onlyid
    wx.navigateTo({
      url: '../detail/detail?detailId=' + onlyId,
    })
  },
  loadReserverItem() {
    var that = this
    var userId = wx.getStorageSync('phoneNumber')
    if (userId.length) {
      network.getReserveItem(userId).then((data) => {
        if (data.length) {
          var itemListArray = []

          data.forEach(function (obj) {
            var myObj = obj.attributes.targetItem.attributes
            var imageUrl = myObj.imageArray[0].url || ''
            itemListArray.push({ 'icon': imageUrl, 'name': myObj.name, 'price': '￥' + myObj.price, 'onlyId': obj.attributes.targetItem.id })
          })
          that.setData({
            isHasData: false,
            itemArray: itemListArray,
          })
        }
      }, (error) => {

      })
    }

  },
  onLoad: function () {
   

  },
  onShow(){
    var that = this
    that.loadReserverItem()
    var that = this

    // wx.showLoading({
    //   title: '数据加载中',
    // })

    try {
      var value = wx.getStorageSync('loginSign'),
        orderMessage = ''
      if (value) {
        orderMessage = '您当前没有订单'
      }
      else {
        orderMessage = '您当前尚未登陆'
      }
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
          orderMessage: orderMessage
        })
        // wx.hideLoading()
      })
    } catch (e) {
      that.setData({
        'orderMessage': ''
      })
    }
  }
})
