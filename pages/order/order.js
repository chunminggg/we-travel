const netWork = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phoneNumber:'',
    startPlace:'',
    firstCount:1,
    secondCount:0,
    startDate: '2018-12-01',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.productId
    })
  },
  bindDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  nameChange(e){
    this.setData({
      name:e.detial.detail.value
    })
  },
  numberChange(e){
    const obj = {};
    obj[e.target.dataset.str] = e.detail.value;
    this.setData(obj);
  },
  inputChange(e){
    const obj = {};
    obj[e.target.dataset.str] = e.detail.detail.value;
    this.setData(obj);
  },
  submitOrder(){
    if(this.validate()){
      wx.showLoading({
        title: '正在提交',
      })
      let params = {
        id:this.data.id,
        name:this.data.name,
        phoneNumber:this.data.phoneNumber,
        startPlace:this.data.startPlace,
        startDate:this.data.startDate,
        firstCount: `${this.data.firstCount}`,
        secondCount: `${this.data.secondCount}`
      }
      netWork.saveOrder(params).then(data=>{
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack({
          
        })
      })
    }
  },
  validate() {
    if (!this.data.name || !this.data.startPlace) {
      wx.showToast({
        title: '表单填写不完整',
        icon: 'none'
      })
      return false
    }
    else if (!(/^1[34578]\d{9}$/.test(this.data.phoneNumber))) {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none'
      })
      return false;
    }
    else {
      return true
    }
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