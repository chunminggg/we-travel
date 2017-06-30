var networkBaseUrl = '123'
var getTestData = {
 
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