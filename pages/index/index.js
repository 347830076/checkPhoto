//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
    })
  }
})
