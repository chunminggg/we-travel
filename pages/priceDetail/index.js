// pages/priceDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 0,
    monthArray: [],
    priceArray: [],
    monthItemArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu({
      
    })
    let monthArray = [],
      that = this,
      priceArray = [];
    wx.getStorage({
      key: 'monthArray',
      success: function (res) {
        monthArray = res.data
        wx.getStorage({
          key: 'priceArray',
          success: function (response) {
            priceArray = response.data
            that.setData({
              priceArray: priceArray,
              monthArray: monthArray,
            })
            that.configPriceView()
          },
        })
      },
    })
  },
  configPriceView(){
    let monthItemArray = this.data.monthArray.map(item => {
      return {
        month: item,
        priceArray: []
      }
    })
    this.data.priceArray.map(price => {
      monthItemArray.map(month => {
        if (price.startDate.includes(month.month)) {
          month.priceArray.push(price)
        }
      })
    })
    this.setData({
      monthItemArray:monthItemArray
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