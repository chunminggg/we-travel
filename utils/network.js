var networkBaseUrl = '123'
const AV = require('.././libs/av-weapp-min.js')
var getTestData = {
    // 发送短信验证
    snedShortMessage(phoneNumber,successCallBack,errorCallBack){
    return new Promise(function(reslove, reject){
      AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneNumber,
        template: '验证码',
        'sign': '超想去旅行',
      }).then(()=>{
        resolve()
      },()=> {
        reject()
      })
    })
    },
    sendMessage(){
      wx.showToast({
        title: '短信已发送',
      })
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