var network = require('../../utils/network.js')
var WxParse = require('../../wxParse/wxParse.js');
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowUserInfo: false,
    userInfo: {
      phone: '',
      name: ''
    },
    icon60: '',
    onlyId: '',
    detailData: {},
    winWidth: 0,
    winHeight: 0,
    scrollTop: 100,
    // tab切换 
    currentTab: 0,
    offsetTop: 0,
    imageArray: [],
    fileArray: [],
    countNumber: 0,
    //price view
    showModalStatus: false,
    isSeller:false,
    tagArray: [],
    myList: [{
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
    list: [{
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
  enterOrder() {
    wx.navigateTo({
      url: `../order/order?productId=${this.data.onlyId}`,

    })
  },
  getDetailData(onlyId) {
    wx.showLoading({
      title: '数据加载中',
    })
    var that = this
    network.getDetailItemWithId(onlyId, (data) => {
      if (data.type == '5bfd42f844d904005f2595a8'){
        wx.setStorage({
          key: 'orderPhone',
          data: '13776106499',
        })
      }
      if (data.type == '5c061a63303f39005f3111a7') {
        wx.setStorage({
          key: 'orderPhone',
          data: '18018148030',
        })
      }
      var localImageArray = []
      if (data.imageArray.length) {
        localImageArray = []
        localImageArray = data.imageArray
      }
      wx.hideLoading()
      that.setData({
        tagArray: data.tagArray,
        detailData: data,
        icon60: data.imageArray[0].url,
        imageArray: localImageArray,
      })
      var list = []
      for (let i = 0, len = that.data.list.length; i < len; i++) {
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
    }, (error) => {

    })
  },
  showDetailPriceView(e) {
    let monthArray = []
    this.data.tagArray.map(item => {
      let arrayDate = item.startDate.split('-'),
        first = arrayDate[0],
        second = arrayDate[1],
        monthData = `${first}-${second}`;
      monthArray.push(monthData)

    })
    monthArray = [...new Set(monthArray)]
    wx.setStorage({
      key: 'monthArray',
      data: monthArray
    })
    wx.setStorage({
      key: 'priceArray',
      data: this.data.tagArray,
    })
    wx.navigateTo({
      url: '../priceDetail/index'
    })

  },
  //主页面纵向滑动时间
  mainScroll(e) {

  },
  makePhone(e) {
    // wx.makePhoneCall({
    //   phoneNumber: '15151965292' 
    // })

  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this
    that.setData({
      currentTab: e.detail.current
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {

    var that = this
    if (that.data.cuurentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        scorllTop: that.data.scorllTop + 20,
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo(options)
    this.checkUserLevel()
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          onlyId: options.detailId,
          winWidth: res.screenWidth,
          winHeight: res.windowHeight,
        })
      },
    })

    this.getDetailData(this.data.onlyId)
    setTimeout(function() {
      let countId = that.data.onlyId

      //  network.makeProductCount(countId,that.data.detailData.countNumber)
    }, 3000)
  },
  // 检查当前用户等级状态
  checkUserLevel(){
    let userPhoneNumber = network.getCurrentUserPhone()
    if(userPhoneNumber.length){
      network.checkUserIsSeller(userPhoneNumber).then(data=>{
        if(data.length){
          let userItem = data[0].toJSON()
          wx.setStorage({
            key: 'isSeller',
            data: userItem.ifSeller,
          })
          this.setData({
            isSeller: userItem.ifSeller
          })
        }
      })
    }
    else{
      wx.setStorage({
        key: 'isSeller',
        data: false,
      })
    }
  },
  getUserInfo(options) {
    let phone = options.phone
    if (phone == undefined || phone == '') {
      return
    }
    network.getUserInfoWithPhone(phone).then(info => {
      if (info.length) {
        let currentUser = info[0].toJSON()
        let currentUserPhone = network.getCurrentUserPhone()
        
        if (currentUserPhone != currentUser.mobilePhoneNumber) {
          this.setData({
            userInfo: {
              phone: currentUser.mobilePhoneNumber,
              name: currentUser.name
            },
            isShowUserInfo: true
          })
        }
      }
    })

  },
  //立即预定
  reserverItem(e) {
    var that = this,
      onlyId = this.data.onlyId
    let phoneNumber = wx.getStorageSync('phoneNumber')
    if (phoneNumber == '' || phoneNumber == undefined) {
      wx.navigateTo({
        url: '../login/login?itemId=' + onlyId,
      })
      return
    }
    wx.navigateTo({
      url: '../reserve/reserve?itemId=' + onlyId,
    })
  },
  downloadFile(e) {
    let url = e.currentTarget.dataset.url

    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function(res) {

        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.openDocument({
            filePath: res.tempFilePath
          })
        }
      }
    })
  },
  closePriceView(e) {

  },
  showPriceView(e) {
    return
    let currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })





      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
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