const AV = require('.././libs/av-weapp-min.js')

function replaceAllText(orginString, FindText, RepText) {
  regExp = new RegExp(FindText, "http://lc-qduqr0em.cn-n1.lcfile.com/");
  return orginString.replace(regExp, RepText);
}
var getTestData = {
  // 发送短信验证
  snedShortMessage(phoneNumber, successCallBack, errorCallBack) {
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: phoneNumber,
      name: '星旅游',
      op: '验证',
      ttl: 10
    }).then(function() {
      successCallBack()
    }, function(err) {
      //调用失败
      errorCallBack(egetSpecialPriceListrr)
    });
  },
  sendOrderMessage(params){
   
    return AV.Cloud.requestSmsCode({
      mobilePhoneNumber:params.orderPhone,
      // 海南 18018148030
      template:'五洲订单',
      saleName:params.saleName,
      phoneNumber:params.phoneNumber,
      sign:'五洲旅行'
    })
  },
  saveOrder(params) {
    let obj = new AV.Object('Order')
    obj.set('name', params.name)
    obj.set('phoneNumber', params.phoneNumber)
    obj.set('startDate', params.startDate)
    obj.set('startPlace', params.startPlace)
    obj.set('firstCount', params.firstCount)
    obj.set('secondCount', params.secondCount)
    let product = AV.Object.createWithoutData("Product", params.id)
    obj.set('targetProduct', product)
    return obj.save()
  },
  //验证短信sa
  verifyMessageCode(verifyCode, phoneNumber, successCallBack, errorCallBack) {
    var that = this
    AV.Cloud.verifySmsCode(verifyCode, phoneNumber).then(function() {
      //验证成功
      that.createNewUser(phoneNumber)
      setTimeout(function() {
        successCallBack()
      }, 500)
    }, function(err) {
      //验证失败
      errorCallBack(err)
    });
  },
  //存储用户信息
  createNewUser(phoneNumber) {
    AV.User.loginWithWeapp().then(user => {
      user.setMobilePhoneNumber(phoneNumber);

    }).catch(console.error);
  },
  //leancloud login
  loginWithLeanCloud(userInfo) {
    return new Promise(resolve => {
      AV.User.loginWithWeapp().then(user => {
        user.set(userInfo).save().then(user => {
          resolve(user);
        }).catch(console.error);
      }).catch(console.error);
    });
  },
  // 保存姓名
  saveName(name) {
    const user = AV.User.current();
    return user.set({
      name: name
    }).save();
  },
  saveSellerName(name) {
    const user = AV.User.current();
    return user.set({
      sellerName: name,
    }).save();
  },
  getUserInfoWithPhone(phone) {
    var query = new AV.Query('_User')
    query.equalTo('mobilePhoneNumber', phone)
    return query.find()
  },
  checkUserIsSeller(phoneNumber){
    let query = new AV.Query('UserCopy');
    query.equalTo('mobilePhoneNumber',phoneNumber)
    return query.find()
  },
  getCurrentUserPhone() {
    let userInfo = AV.User.current()
    if (userInfo == null) {
      return ''
    } else {
      return userInfo.toJSON().mobilePhoneNumber
    }


  },
  //获取手机验证码
  getVerifyMobilePhone(phone) {
    return AV.Cloud.requestSmsCode(phone)
  },
  //校验手机验证码
  signUpOrlogInWithMobilePhone(phone, code) {
    return AV.User.signUpOrlogInWithMobilePhone(phone, code)
  },
  copyUser(user) {
    const data = user.toJSON();
    const objectId = data.objectId;
    var query = new AV.Query('UserCopy');
    query.equalTo('mobilePhoneNumber', data.mobilePhoneNumber).find().then(d => {
      if (d.length) {
        console.log('存在', d)
        d[0].set('username', data.username);
        d[0].set('name', data.name);
        d[0].set('sellerName', data.sellerName);
        d[0].set('mobilePhoneNumber', data.mobilePhoneNumber);
        d[0].set('authData', JSON.stringify(data.authData));
        d[0].save()
      } else {
        console.log('不存在', d)
        let obj = new AV.Object('UserCopy')
        obj.set('username', data.username);
        obj.set('name', data.name);
        obj.set('sellerName', data.sellerName);
        obj.set('mobilePhoneNumber', data.mobilePhoneNumber);
        obj.set('authData', JSON.stringify(data.authData));
        obj.save()
      }
    });
  },
  leanCloudGetUserInfo(phoneNumber) {
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({
        userInfo
      }) => {
        // 更新当前用户的信息
        userInfo.mobilePhoneNumber = phoneNumber
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          // this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    });
  },
  getMainScroll(successCallback) {
    return new Promise((resolve, reject) => {
      var query = new AV.Query('MainScroll')
      query.descending('createdAt')
      query.find().then((data) => {
        var imageArray = data[0].attributes.imageArray
        if (imageArray.length) {
          var dataArray = []
          for (var i = 0; i < imageArray.length; i++) {
            dataArray.push({
              'imageUrl': imageArray[i].url
            })
          }
          return resolve(dataArray)
        }
      }, (error) => {
        reject(error)
      })
    })
  },
  //产品留存计数
  makeProductCount(onlyId, countNumber) {
    let todo = AV.Object.createWithoutData('Product', onlyId)
    todo.set('countNumber', countNumber + 1)
    todo.save()
  },
  //获取特价列表
  getSpecialPriceList(isLimit) {
    var query = new AV.Query('Product')
    // query.equalTo('isSpecialPrice', true)
    query.equalTo('type', '5c0fa55a44d904005f481911')

    query.descending('updatedAt')
    if (isLimit) {
      query.limit(6)
    }
    query.addAscending('isRecommend')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    return query.find()
  },
  getListWithSpeicalName(isLimit, className) {
    var query = new AV.Query('Product')
    query.equalTo('type', className)
    if (isLimit) {
      query.limit(6)
    }
    query.descending('updatedAt')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    return query.find()
  },
  //获取推荐列表 北京首页数据
  getRecommendList(isLimit) {
    var query = new AV.Query('Product')
    query.equalTo('type', '5bfd42f844d904005f2595a8')
    if (isLimit) {
      query.limit(6)
    }
    query.descending('updatedAt')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    return query.find()
  },
  //获取跟团游列表 海南数据
  getFollowTravleList(isLimit) {
    var query = new AV.Query('Product')
    // query.equalTo('isFollowTeam', true)
    query.equalTo('type', '5c061a63303f39005f3111a7')
    if (isLimit) {
      query.limit(6)
    }
    query.descending('updatedAt')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    return query.find()
  },
  // 获取自由行列表
  getFreeTravelList(isLimit) {
    var query = new AV.Query('Product')
    // query.equalTo('isFreeTravel', true)
    query.equalTo('type', '5c0fa55a44d904005f481911')
    if (isLimit) {
      query.limit(6)
    }
    query.descending('updatedAt')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    return query.find()
  },

  getAllLineArray() {
    var query = new AV.Query('Type')
    return query.find()
  },
  //获取首页列表
  getMainThemeList(successCallback) {
    return new Promise((resolve, reject) => {
      var query = new AV.Query('Theme')
      query.ascending('type')
      query.addAscending('isSort')
      query.find().then((data) => {
        if (data.length) {
          var dataArray = []
          for (var i = 0; i < data.length; i++) {
            var model = data[i]
            if (model.attributes.imageArray.length) {
              model.attributes.url = model.attributes.imageArray[0].url
              model.attributes.coverDetail = model.attributes.imageArray[1].url
            }
            dataArray.push(data[i].attributes)
          }
        }
        return resolve(dataArray)
      }, (error) => {
        return reject(error)
      })
    })
  },
  //获取列表
  getItemList(typeSign, successCallback) {
    var query = new AV.Query('Product')
    query.equalTo('type', typeSign)
    query.descending('updatedAt')
    query.addAscending('isSort')
    query.select(['place', 'name', 'startDate', 'type', 'onleyId', 'price', 'describe', 'imageArray'])
    query.find().then((data) => {

      if (data.length) {
        var dataArray = []

        for (var i = 0; i < data.length; i++) {
          var model = data[i]

          if (model.attributes.imageArray.length) {
            model.attributes.coverImage = model.attributes.imageArray[0].url

          }
          // model.attributes.endDate = model.attributes.endDate.toISOString().slice(0, 10)
          // model.attributes.startDate = model.attributes.startDate.toISOString().slice(0, 10)

          model.attributes.uid = model.id
          dataArray.push(data[i].attributes)

        }
      }

      return successCallback(dataArray)
    }, function(error) {
      // 异常处理
    });
  },
  //预定
  reserveItem(data, successCallBack, errorCallBack) {
    var Product = AV.Object.extend('OrderItem')
    var product = new Product()
    var targetItem = AV.Object.createWithoutData('Product', data.itemId)
    product.set('userId', data.userId)
    product.set('phoneNumber', data.phoneNumber)
    product.set('name', data.name)
    product.set('peopleCount', data.peopleCount)
    product.set('finishDate', data.finishDate)
    product.set('targetItem', targetItem)
    product.save().then((todo) => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功'
      })
      setTimeout(function() {
        wx.navigateBack({

        })
      }, 500)

    }, (error) => {
      wx.hideLoading()
      wx.showToast({
        title: '提交失败'
      })

    })

  },
  //获取订单
  getReserveItem(userId) {
    var query = new AV.Query('OrderItem')
    query.descending('createdAt')
    query.equalTo('userId', userId)
    query.include('targetItem')
    query.include('targetItem.name')
    query.include('targetItem.onleyId')
    return query.find()
  },
  //根据id获取信息详情
  getDetailItemWithId(onlyId, successCallback, errorCallback) {
    var query = new AV.Query('Product')
    query.equalTo('_id', onlyId)
    query.find().then((data) => {
      if (data.length) {
        var model = data[0]
        model.attributes.uid = model.id
        // model.attributes.startDate = model.attributes.startDate.toISOString().slice(0, 10)
        // model.attributes.endDate = model.attributes.endDate.toISOString().slice(0, 10)
        successCallback(model.attributes)
      }
    }, (error) => {
      wx.showToast({
        title: '获取信息失败，请重试',
      })
    })
  },
}

function handleDataWithNoPostData(dataUrl, success, error) {
  wx.request({
    url: dataUrl,
    success: function(data) {
      return success(data)
    },
    error: function(data) {
      return error(data)
    },
  })
}
module.exports = getTestData