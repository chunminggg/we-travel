var network = require('../../utils/network.js')
Page({
  data: {
    date: "2017-09-01",
    accounts: [],
    accountIndex: 0,
    isAgree: false,
    name:'',
    phoneNumber:'',
    peopleCount:'',
    onlyId:'',
    userInfo:{},
  },
  bindNameInput(e){
  this.setData({
    name:e.detail.value
  })
  },
  
  bindCountInput(e){
    this.setData({
      peopleCount: e.detail.value
    })
  },
  bindPhoneInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindAgreeChange(e){
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  onLoad(options) {
    
    this.setData({
      onlyId: options.itemId
    })
  },
  submitData(e){
    var that = this,
    userId = wx.getStorageSync('phoneNumber')

    var dict = {
      userId:userId,
      phoneNumber: that.data.phoneNumber,
      name: that.data.name,
      peopleCount: that.data.peopleCount,
      finishDate: that.data.date,
      itemId: that.data.onlyId,
    }
    wx.showLoading({
      title: '提交中',
    })
    network.reserveItem(dict)
  },
});