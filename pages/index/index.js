//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nfc:'',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.removeStorage({
      key: 'info',
      success: function (res) {
        console.log(res.data)
      }
    });
    wx.navigateTo({
      url: '../detection/detection'
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
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
          fontSizeSetting: res.fontSizeSetting + "px"
        })
      }
    });
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        that.setData({
          networkType: networkType
        });
      }
    })
    wx.getHCEState({
      success: function (res) {
        console.log(res);
        that.setData({
          nfc:'支持'
        });
      }, fail: function (res){
        console.log('fail',res)
        that.setData({
          nfc: '不支持'
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
