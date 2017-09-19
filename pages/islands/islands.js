var netTool = require('../../utils/network.js')
// pages/specialList/sepicalList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    netTool.getMainThemeList().then(data => {
      that.setData({
        itemArray: data
      })
      wx.setNavigationBarTitle({
        title: '全部海岛',
      })
    })
  },
  clickItem(detailData) {
    var idx = detailData.currentTarget.dataset.itemid,
      model = this.data.itemArray[idx]

    wx.navigateTo({
      url: '../detail/detail?detailId=' + model.id,
    })
  },
  clickImageidx(e) {
    var idx = e.currentTarget.dataset.type
    let naviTitle = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../itemList/itemList?type=${idx}&title=${naviTitle}`,
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