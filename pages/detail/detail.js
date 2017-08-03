var network = require('../../utils/network.js')
var WxParse = require('../../wxParse/wxParse.js');
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon60: 'http://omh0qz95c.bkt.clouddn.com/111499175319_.pic.jpg',
    onlyId: '',
    detailData:{},
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0, 
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
    var that = this
    network.getDetailItemWithId(onlyId,(data)=>{
      that.setData({
      detailData:data
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
          winHeight: res.screenHeight,
        })
      },
    }) 
 
  this.getDetailData(this.data.onlyId)
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