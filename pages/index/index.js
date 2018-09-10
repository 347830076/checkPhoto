//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nfc: '',
  },
  //事件处理函数
  bindViewTap: function () {
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
    //监听网络状态变化。
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      var networkType = res.networkType
      that.setData({
        networkType: networkType !== 'none' ? networkType : "无网络"
      });
    });
    wx.startWifi({
      success: function (res) {
        console.log(res.errMsg);
        //获取已连接中的 Wi-Fi 信息
        wx.getConnectedWifi({
          success: function (res) {
            console.log('wifi_info:', res);
            if (res.wifi) {
              that.setData({
                SSID: res.wifi.SSID,
                BSSID: res.wifi.BSSID,
                secure: res.wifi.secure ? "安全" : "危险",
                signalStrength: res.wifi.signalStrength > 80 ? "强" : (signalStrength > 50 ? "中" : "弱"),
              });
            }
          }, fail(res) {
            console.log('wifi_info_fail:', res)
          }, complete() {
            wx.stopWifi({
              success: function (res) {
                console.log(res.errMsg)
              }
            })
          }
        })
      }
    })

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
    })
  },
  //复制设备信息
  setClip: function () {
    let info = this.data;
    let wifiInfo = '';
    if (info.SSID) {
      wifiInfo = "\n\r WiFi名字：" + info.SSID + "\n\r WiFi地址：" + info.BSSID + "\n\r WiFi安全：" + info.secure + "\n\r WiFi信号：" + info.signalStrength
    }
    wx.setClipboardData({
      data: "  手机品牌：" + info.brand + "\n\r 手机型号：" + info.model + "\n\r 客户端平台：" + info.platform + "\n\r 操作系统版本：" + info.system + "\n\r 微信版本号：" + info.version + "\n\r 基础库版本：" + info.SDKVersion  + "\n\r 设备像素比：" + info.pixelRatio + "\n\r 状态栏的高度：" + info.statusBarHeight + "\n\r 屏幕宽度：" + info.screenWidth + "\n\r 屏幕高度：" + info.screenHeight + "\n\r 可使用窗口宽度：" + info.windowWidth + "\n\r 可使用窗口高度：" + info.windowHeight + "\n\r 用户字体大小：" + info.fontSizeSetting + "\n\r 当前网络状态：" + info.networkType + wifiInfo + "\n\r 是否支持NFC：" + info.nfc,
      success: function (res) {
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '检测手机真伪小程序', // 分享标题
      path: 'pages/index/index',
      imageUrl: '../../image/share1.jpg'
    }
  }
})
