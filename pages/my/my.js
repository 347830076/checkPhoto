const app = getApp();
Page({
  data: {
    openid : null
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('openid:', res)
        that.setData({
          openid:res.data
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          brand: res.brand,
          model: res.model,
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          version: res.version,
          platform: res.platform,
          system: res.system,
          fontSizeSetting: res.fontSizeSetting + "px",
          SDKVersion: res.SDKVersion,
          benchmarkLevel: res.benchmarkLevel,
          statusBarHeight: res.statusBarHeight + "px"
        })
      }
    });
    //获取网络状态。
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        that.setData({
          networkType: networkType
        });
      }
    });

    //判断当前设备是否支持 HCE 能力。
    wx.getHCEState({
      success: function (res) {
        console.log(res);
        that.setData({
          nfc: '支持'
        });
      }, fail: function (res) {
        console.log('fail', res)
        that.setData({
          nfc: '不支持'
        });
      }
    });
  },
  openwin: function (event) { //跳转页面
    let path = event.currentTarget.dataset.url;
    if (path == 'setClip'){
      this.setClip();
    }else{
      wx.navigateTo({
        url: './' + path + '/' + path
      })
    }
  },
  //登录用户授权
  bindGetUserInfo: function (e) {
    console.log('bindGetUserInfo', e);
    let that = this;
    if (e.detail.userInfo) {
      new Promise((resolve, reject) => {
        wx.login({
          success: function (res) {
            if (res.code) {
              resolve({
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                code: res.code,
                userInfo: e.detail.userInfo,
                type: e.currentTarget.dataset.type
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
              reject();
            }
          }
        });
      }).then((resolve) => {
        console.log('resolve' + JSON.stringify(resolve));
        that.login(resolve);
      })
    }
  },
  //请求服务器 登录
  login: function (obj) {
    let that = this;
    
    if (that.data.openid) {
      return false;
    }

    wx.request({
      url: app.globalData.serverUrl + 'Home/Small/login',
      data: {
        code: obj.code,
        data: this.data,
        userInfo: obj.userInfo
      },
      method: 'GET',
      success: function (res) {
        console.log('登录', res);
        if (res.data.code === '1') {
          //保存openid在本地缓存
          wx.setStorage({
            key: 'openid',
            data: res.data.data.openid
          })
        }
      }
    });
  },
  //复制微信号
  setClip: function () {
    wx.setClipboardData({
      data: "small_check",
      success: function (res) {
      }
    })
  },
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
    return {
      title: '检测手机真伪小程序', // 分享标题
      path: 'pages/index/index?openid=' + this.data.openid,
      imageUrl: '../../image/share1.jpg'
    }
  }
})