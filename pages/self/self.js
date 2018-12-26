// pages/self/self.js
const AV = require('../.././libs/av-weapp-min.js')
const netWork = require('../../utils/network.js')
let timer = null;
const waitTime = 60;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginType: 'login',
    phone: '',
    code: '',
    name: '',
    focus: false,
    ifEditingName: false,
    name2: '',
    focus2: false,
    ifEditingName2: false,
    timeCount: waitTime
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkIfLogin()
  },
  checkIfLogin() {
    let currentUser = AV.User.current();
    console.log(currentUser)
    if (currentUser) {
      this.setData({
        loginType: 'hasLogin',
        phone: currentUser.attributes.mobilePhoneNumber,
        name: currentUser.attributes.name,
        name2: currentUser.attributes.sellerName
      });
    } else {
      this.setData({
        loginType: 'login'
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
      name: detail.value
    })
  },
  changeName2({
    detail
  }) {
    this.setData({
      name2: detail.value
    })
  },
  login(e) {
    if (this.data.phone === '') {
      wx.showToast({
        icon: 'none',
        title: '手机号码不能为空',
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式不正确',
      })
      return;
    }
    if (!this.data.code === '') {
      wx.showToast({
        icon: 'none',
        title: '验证码不能为空',
      })
      return;
    }
    netWork.signUpOrlogInWithMobilePhone(this.data.phone, this.data.code).then(user => {
      user.linkWithWeapp();
      netWork.copyUser(user);
      this.setData({
        loginType: 'hasLogin',
        name: user.attributes.name,
        name2: user.attributes.sellerName,        
      });
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '无效的验证码',
      })
    });
  },
  editName() {
    this.setData({
      ifEditingName: true
    });
    this.setData({
      focus: true
    })
  },
  editName2() {
    this.setData({
      ifEditingName2: true
    });
    this.setData({
      focus2: true
    })
  },
  focus() {
    this.setData({
      focus: true
    })
  },
  focus2() {
    this.setData({
      focus2: true
    })
  },
  blur() {
    this.setData({
      focus: false
    })
  },
  blur2() {
    this.setData({
      focus2: false
    })
  },
  saveName() {
    netWork.saveName(this.data.name).then(d => {
      netWork.copyUser(d);
      wx.showToast({
        title: '修改成功',
      })
      this.setData({
        ifEditingName: false
      });
    });
  },
  saveName2() {
    netWork.saveSellerName(this.data.name2).then(d => {
      netWork.copyUser(d);
      wx.showToast({
        title: '修改成功',
      })
      this.setData({
        ifEditingName2: false
      });
    });
  },
  getCode() {
    if (this.data.phone === '') {
      wx.showToast({
        icon: 'none',
        title: '手机号码不能为空',
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式不正确',
      })
      return;
    }
    netWork.getVerifyMobilePhone(this.data.phone).then(data => {
      timer = setInterval(() => {
        if (this.data.timeCount <= 0) {
          clearInterval(timer);
          this.setData({
            timeCount: waitTime
          });
          return;
        }
        this.setData({
          timeCount: this.data.timeCount - 1
        });
      }, 1000);
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '获取验证码失败',
      })
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