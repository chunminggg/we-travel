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
    current: 0,
    isShowPriceModal: false,
    isSeller: false,
    currentPriceObj: {
      startDate: '',
      price: '',
      commission: '',
      comment: '',
      childPrice: '',
      childComment: ''
    },
    filterArray: [],
    isShowActionSheet:false,
    priceActions:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu({

    })
    let that = this
    wx.getStorage({
      key: 'isSeller',
      success(res) {
        that.setData({
          isSeller: res.data
        })
      },
    })
    let monthArray = [],
      priceArray = [];
    wx.getStorage({
      key: 'monthArray',
      success: function(res) {
        monthArray = res.data
        wx.getStorage({
          key: 'priceArray',
          success: function(response) {
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
  handleTabsChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  // 点击价格视图
  showPriceDetail(e) {
    let currentMonthItem = this.data.monthItemArray.filter(item => item.month == this.data.current)
    let currentPriceArray = currentMonthItem[0].priceArray.filter(item => item.startDate == e.currentTarget.dataset.price.startDate)
    if (currentPriceArray.length != 1) {
      currentPriceArray = currentPriceArray.map(item => {
        return {
          ...item,
          name: `${item.price}(${item.comment})`
        }
      })
      this.setData({
        priceActions:currentPriceArray,
        isShowActionSheet:true
      })
    } else {
      this.setData({
        currentPriceObj: e.currentTarget.dataset.price,
        isShowPriceModal: true
      })
    }

  },
  handleClose() {
    this.setData({
      isShowPriceModal: false
    })
  },
  handleActionCancel(){
    this.setData({
      isShowActionSheet:false
    })
  },
  handleClickActionItem({ detail }) {
    const index = detail.index;

    let currentPriceItem = this.data.priceActions[index]
    this.setData({
      currentPriceObj: currentPriceItem,
      isShowPriceModal: true,
      isShowActionSheet:false
    })
  },
  configPriceView() {
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
    monthItemArray.map(item => {
      item.priceArray = this.quickSort(item.priceArray, "startDate", false)
      item.filterPriceArray = this.unique(JSON.parse(JSON.stringify(item.priceArray)))

    })

    this.setData({
      monthItemArray: monthItemArray,
      current: monthItemArray[0].month
    })
  },
  unique(array) {
    let filterArray = []
    array.map(item => {
      if (filterArray.length) {
        let findArray = filterArray.find(obj => obj.startDate == item.startDate)
        let findIndex = filterArray.findIndex(obj => obj.startDate == item.startDate)
        if (findArray == undefined) {
          filterArray.push(item)
        }
        else{
          let itemPrice = parseFloat(item.price)
          let findPrice = parseFloat(findArray.price)
          if(findPrice>itemPrice){
            filterArray[findIndex] = item
          }
        }
      } else {
        filterArray.push(item)
      }
    })
    return filterArray
  },
  quickSort(arr, name, snum) {
    //如果数组<=1,则直接返回
    if (arr.length <= 1) {
      return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    //找基准，并把基准从原数组删除
    var pivot = arr.splice(pivotIndex, 1)[0];
    var middleNum = pivot[name];
    // 定义左右数组
    var left = [];
    var right = [];
    //比基准小的放在left，比基准大的放在right
    if (snum) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i][name]) <= Number(middleNum)) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][name] <= middleNum) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
    }
    let that = this
    //递归,返回所需数组
    return that.quickSort(left, name, snum).concat(
      [pivot],
      that.quickSort(right, name, snum)
    );
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