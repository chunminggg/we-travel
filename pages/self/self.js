// pages/self/self.js
const AV = require('../.././libs/av-weapp-min.js')
const netWork = require('../../utils/network.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginType: 'register',
    phone: '13732645412',
    code: '123456',
    name: '小志'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkIfLogin()
  },
  checkIfLogin() {
    let currentUser = AV.User.current();
    if (currentUser) {
      this.setData({
        loginType: 'hasLogin'
      });
    } else {
      this.setData({
        loginType: 'register'
      });
    }
  },
  changePhone({
    detail
  }) {
    this.setData({
      phone: detail.detail.value
    })
  },
  changeCode({
    detail
  }) {
    this.setData({
      code: detail.detail.value
    })
  },
  changeName({
    detail
  }) {
    this.setData({
      name: detail.detail.value
    })
  },
  login(e) {
    netWork.logInWithMobilePhoneSmsCode(this.data.phone, this.data.code).then(d => {
      this.setData({
        loginType: 'hasLogin'
      });
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '无效的验证码',
      })
    });
  },
  register(e) {
    debugger
    netWork.checkIfExistPhone(this.data.phone).then(data=>{
      debugger
    });
    return;
    netWork.signUpOrlogInWithMobilePhone(this.data.phone, this.data.code).then(user => {
      user.linkWithWeapp();
      this.setData({
        loginType: 'hasLogin'
      });
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '无效的验证码',
      })
    });
  },
  getCode() {
    netWork.getVerifyMobilePhone(this.data.phone).then(data => {
      console.log('发送验证码')
    });
  },
  getLoginCode() {
    netWork.requestLoginSmsCode(this.data.phone).then(data => {
      console.log('发送登录验证码')
    });
  },
  goToRegister() {
    this.setData({
      loginType: 'register'
    })
    this.resetInputData();
  },
  goToLogin() {
    this.setData({
      loginType: 'login'
    })
    this.resetInputData();
  },
  resetInputData() {
    this.setData({
      code: '',
      name: ''
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})