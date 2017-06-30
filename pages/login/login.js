// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '验证码',
    isCode: false,
    phoneNumber:'123',
  },
  clickCodeButton:function(e){
    var that = this
    if (!this.configPhoneNumber()){
      this.code = true
      var timeNumberCount = 60
      that.countdown(timeNumberCount)
    }
  },
  countdown(timeSecond) {
    var that = this
    if (timeSecond == 0) {
      that.setData({
        second: "验证码",
        isCode : false,
      });

      return;
    }
    var time = setTimeout(function () {
      timeSecond -= 1
      that.setData({
        second:`${timeSecond}秒`
      })
      that.countdown(timeSecond);
    }
      , 1000)
  },
  configPhoneNumber:function(){
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (this.data.phoneNumber.length == 0) {
      wx.showToast({
        title: '请填写手机号号',
      })
      return false
    }
    if (this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确手机号',
      })
      return false
    }
    if (!myreg.test(this.data.phoneNumber)) {
      wx.showToast({
        title: '输入手机号有误',
      })
      return false
    }
   return true
  },
  bindKeyInput:function(e){
    this.data.phoneNumber = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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