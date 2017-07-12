var networkBaseUrl = '123'
const AV = require('.././libs/av-weapp-min.js')
var getTestData = {
    // 发送短信验证
    snedShortMessage(phoneNumber,successCallBack,errorCallBack){
      
      AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneNumber,
        name: '超想去旅行',
        op: '验证',
        ttl: 10                
      }).then(function () {
        successCallBack()
      }, function (err) {
        //调用失败
        
        errorCallBack(err)
      });
},
//验证短信
verifyMessageCode(verifyCode,phoneNumber,successCallBack,errorCallBack){
  AV.Cloud.verifySmsCode(verifyCode,phoneNumber ).then(function () {
    //验证成功
    successCallBack()
  }, function (err) {
    //验证失败
    errorCallBack(err)
  });
},
//leancloud login
loginWithLeanCloud(){
  var that = this
  AV.User.loginWithWeapp().then(user => {
    // this.globalData.user = user.toJSON();
    that.leanCloudGetUserInfo('123')
  }).catch(console.error);
},
leanCloudGetUserInfo(phoneNumber){
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({userInfo}) => {
        // 更新当前用户的信息
        userInfo.mobilePhoneNumber = phoneNumber
        user.set(userInfo).save().then(user => {
          
          // 成功，此时可在控制台中看到更新后的用户信息
          // this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    });
  },
  //获取列表
  getItemList(typeSign,successCallback){
    var query = new AV.Query('Product')
    query.equalTo('type',typeSign)
    query.find().then((data) =>{
      if(data.length){
        var dataArray = []
        for (var i = 0; i < data.length; i++) {
      dataArray.push(data[i].attributes)
        }
      }
     
      return successCallback(dataArray)
    }, function (error) {
      // 异常处理
    });
  }
}
function handleDataWithNoPostData(dataUrl,success,error){
  wx.request({
    url: dataUrl,
    success:function(data){
      return success(data)
    },
    error:function(data){
      return error(data)
    },
  })
}
module.exports = getTestData