// pages/login/login.js
var netTool = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '验证码',
    isCode: false,
    phoneNumber:'123',
    isConfirmed: true,
    confirmCode : '',
    itemId:'',
  },
  //点击获取验证码
  clickCodeButton:function(e){
    var that = this
    if (this.configPhoneNumber()){
      that.setData({
        isCode: true,
      });
      var timeNumberCount = 60
      that.countdown(timeNumberCount)
      that.sendCodeMessage()
      this.setData({
        isConfirmed: false
      })
    }
  },
  // 发送验证码
  sendCodeMessage(){
    
    netTool.snedShortMessage(this.data.phoneNumber,function(){
      
    },function(error){
      wx.showToast({
        title: '验证码发送失败，请重试',
      })
    })
   
  },
  //验证码输入框监听
  bindCodeInput(e){
   this.setData({
     confirmCode : e.detail.value
   })
   
  },
  //验证账号
  confirmAccount(){
    wx.showLoading({
      title: '验证中',
    })
    var that = this
    netTool.verifyMessageCode(that.data.confirmCode,that.data.phoneNumber,function(){
      wx.hideLoading()
      wx.showToast({
        title: '验证成功',
      })
      that.backSelfCenter()
    },function(err){
      
      wx.showToast({
        title: '验证失败',
      })
    })
  },
  // 验证成功后返回，并记录下登陆状态和手机号
  backSelfCenter(){
    wx.setStorageSync('loginSign', '1')
    wx.setStorageSync('phoneNumber',this.data.phoneNumber)
    netTool.leanCloudGetUserInfo(this.data.phoneNumber)
    //跳转到成功页面
    wx.navigateBack({
      
    })

  },
  countdown(timeSecond) {
    var that = this
    if (timeSecond == 0) {
      that.setData({
        second: "重新获取",
        isCode : false,
      });

      return;
    }
    else {
      that.setData({
        second: `${timeSecond}秒`
      })
      var time = setTimeout(function () {
        timeSecond -= 1

        that.countdown(timeSecond);
      }
        , 1000)
    }
  
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
  // if(options.itemId.length){
  //   this.setData({
  //     itemId:options.itemId
  //   })
    
  // }
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