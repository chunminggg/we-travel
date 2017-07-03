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