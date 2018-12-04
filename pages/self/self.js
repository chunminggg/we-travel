// pages/self/self.js
const AV = require('../.././libs/av-weapp-min.js')
const netWork = require('../../utils/network.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginType: 'login',
    phone: '13732645412',
    code: '123456'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.oneStepLogin()
  },
  oneStepLogin() {
    let currentUser = AV.User.current();
    if (currentUser) {
      this.setData({
        loginType: 'hasLogin'
      });
    } else {
      this.setData({
        loginType: 'login'
      });
      // wx.getSetting({
      //   success(res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //       wx.getUserInfo({
      //         success: function(res) {
      //           console.log(res.userInfo,111)
      //         }
      //       })
      //     }
      //   }
      // })
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
  bindGetUserInfo(e) {
    // 未授权
    if (!e.detail.userInfo) {
      return;
    }
    netWork.verifyMobilePhone(this.data.code).then(d => {
      netWork.loginWithLeanCloud({ ...e.detail.userInfo,
        mobilePhoneNumber: this.data.phone
      }).then(data => {
        debugger
        this.setData({
          loginType: 'hasLogin'
        });
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
  goToRegister() {

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