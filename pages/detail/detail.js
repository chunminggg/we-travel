var network = require('../../utils/network.js')
var WxParse = require('../../wxParse/wxParse.js');
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon60: 'http://omh0qz95c.bkt.clouddn.com/111499175319_.pic.jpg',
    onlyId: '',
    detailData:{},
    list: [
      {
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
  kindToggle: function (e) {
   
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        // list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  
  },
  getDetailData(onlyId){
    var that = this
    network.getDetailItemWithId(onlyId,(data)=>{
      that.setData({
      detailData:data
    })
    
    for(var i=0, len = this.data.list.length; i<len ; ++i){
      var model = this.data.list[i]
      model.content = that.data.detailData.detailContent[i].content
    }
    },(error)=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    onlyId: options.detailId
  })
  this.getDetailData(this.data.onlyId)
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