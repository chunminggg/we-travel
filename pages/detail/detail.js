var network = require('../../utils/network.js')
var WxParse = require('../../wxParse/wxParse.js');
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon60: '',
    onlyId: '',
    detailData:{},
    winWidth: 0,
    winHeight: 0,
    scrollTop: 100,
    // tab切换 
    currentTab: 0, 
    offsetTop: 0,
    imageArray:[],
    myList: [
      {
        id: 'form',
        name: '线路特色',
        open: false,

      },
      {
        id: 'widget',
        name: '行程介绍',
        open: false,
      },
      {
        id: 'feedback',
        name: '费用说明',
        open: false,
      },
      {
        id: 'nav',
        name: '预订须知',
        open: false,
      }
    ],
    list: [
      {
        id: 'form',
        name: '线路特色',
        open: false,
       
      },
      {
        id: 'widget',
        name: '行程介绍',
        open: false,
      },
      {
        id: 'feedback',
        name: '费用说明',
        open: false,
      },
      {
        id: 'nav',
        name: '预订须知',
        open: false,
      }
    ]
  },
  
  getDetailData(onlyId){
    wx.showLoading({
      title: '数据加载中',
    })
    var that = this
    network.getDetailItemWithId(onlyId,(data)=>{
      
      var localImageArray = [{ 'url': 'http://ac-qDUQr0Em.clouddn.com/741cc9231efb2930db26.JPG'}]
      if(data.imageArray.length){
        localImageArray = []
        localImageArray = data.imageArray
      }
      wx.hideLoading()
      that.setData({
      detailData:data,
      icon60:data.imageArray[0].url,
      imageArray: localImageArray,
    })
   var list = []
    for (let i = 0, len = that.data.list.length; i<len ; i++){
      var model = that.data.list[i]
      model.content = that.data.detailData.detailContent[i].content    
      list.push(model)
    }
    var line = that.data.list[0].content,
        line1 = that.data.list[1].content,
        line2 = that.data.list[2].content,
        line3 = that.data.list[3].content
    WxParse.wxParse('line', 'html', line, that, 5)
    WxParse.wxParse('trip', 'html', line1, that, 5)
    WxParse.wxParse('money', 'html', line2, that, 5)
    WxParse.wxParse('order', 'html', line3, that, 5)
    },(error)=>{

    })
  },
  //主页面纵向滑动时间
  mainScroll(e){
  
  },
  /** 
  * 滑动切换tab 
  */
  bindChange: function (e) {
    
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

   var that = this 
   if (that.data.cuurentTab === e.target.dataset.current){
     return false
   }
   else{
     that.setData({
       scorllTop : that.data.scorllTop+ 20,
       currentTab: e.target.dataset.current
     })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          onlyId: options.detailId,
          winWidth: res.screenWidth,
          winHeight: res.windowHeight,
        })
      },
    }) 
 
  this.getDetailData(this.data.onlyId)
  },
  //立即预定
  reserverItem(e){
    var that = this,
        onlyId = this.data.onlyId
      let phoneNumber = wx.getStorageSync('phoneNumber')
      if(phoneNumber =='' || phoneNumber == undefined){
        wx.navigateTo({
          url: '../login/login?itemId=' + onlyId,
        })
        return
      }
    wx.navigateTo({
      url: '../reserve/reserve?itemId=' + onlyId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})