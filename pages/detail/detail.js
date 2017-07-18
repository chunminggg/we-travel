var network = require('../../utils/network.js')
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon60: 'http://omh0qz95c.bkt.clouddn.com/111499175319_.pic.jpg',
    onlyId: '',
    detailData:{},
  },
  getDetailData(onlyId){

    
    var that = this
    network.getDetailItemWithId(onlyId,(data)=>{
      that.setData({
      detailData:data
    })
    
    },(error)=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    onlyId: options.detailId
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