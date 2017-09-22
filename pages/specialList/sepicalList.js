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
    let className = options.name

    netTool.getListWithSpeicalName(false, className).then(data => {
      let myDealArray = []
      data.forEach(obj => {
        obj.attributes.id = obj.id
        obj.attributes.coverImage = obj.attributes.imageArray[0].url
        if (className == 'isSpecialPrice') {
          obj.attributes.coverImage = obj.attributes.imageArray[1].url
        }
        myDealArray.push(obj.attributes)
      })
      that.setData({
        itemArray: myDealArray
      })
      wx.setNavigationBarTitle({
        title: options.title,
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