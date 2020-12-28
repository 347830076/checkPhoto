const app = getApp();
let openid = null;
let p_openid = null;
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
  onLoad: function (options) {
    let that = this;
    
    console.log(options)
    if (options && options.p_openid) {
      p_openid = options.p_openid;
    }

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('openid:', res)
        openid = res.data;
        that.setData({
          openid: openid
        })
      }
    })

    // 获取系统信息
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
    //监听网络状态变化。
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      var networkType = res.networkType
      that.setData({
        networkType: networkType !== 'none' ? networkType : "无网络"
      });
    });
    // 获取wifi信息
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
                signalStrength: res.wifi.signalStrength ? res.wifi.signalStrength > 80 ? "强" : (signalStrength > 50 ? "中" : "弱") : "",
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
    });

    //检查小程序最新版本并下载
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate)
      });
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '更新到最新版小程序，获得更好体验。',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      });
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您的微信版本过低，可以下载最新微信版本，获取更多的小程序功能',
        showCancel: false,
        confirmText: "知道了",
        success: function (res) {
        }
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
    if (obj.type === 'check') {
      that.bindViewTap();
    } else if (obj.type === 'copy') {
      that.setClip();
    }

      wx.request({
        url: app.globalData.serverUrl + 'login',
        data: {
          code: obj.code,
          data: this.data,
          userInfo: obj.userInfo,
          p_openid: p_openid
        },
        method: 'POST',
        success: function (res) {
          console.log('登录', res);
          if (res.data.status === 200) {
            openid = res.data.data.openid;
            console.log(openid);
            //保存openid在本地缓存
            wx.setStorage({
              key: 'openid',
              data: openid
            });
            that.setData({
              openid: openid
            })
          }
        }
      });
  },

  //复制设备信息
  setClip: function () {
    let info = this.data;
    let wifiInfo = '', benchmarkLevel = '';
    if (info.SSID) {
      wifiInfo = "\n\r WiFi名字：" + info.SSID + "\n\r WiFi地址：" + info.BSSID + "\n\r WiFi安全：" + info.secure + "\n\r WiFi信号：" + info.signalStrength;
    }
    if (info.benchmarkLevel) {
      benchmarkLevel = "\n\r 性能等级：" + info.benchmarkLevel;
    }
    wx.setClipboardData({
      data: "  手机品牌：" + info.brand + "\n\r 手机型号：" + info.model + "\n\r 客户端平台：" + info.platform + "\n\r 操作系统版本：" + info.system + "\n\r 微信版本号：" + info.version + "\n\r 基础库版本：" + info.SDKVersion + "\n\r 设备像素比：" + info.pixelRatio + "\n\r 状态栏的高度：" + info.statusBarHeight + "\n\r 屏幕宽度：" + info.screenWidth + "\n\r 屏幕高度：" + info.screenHeight + "\n\r 可使用窗口宽度：" + info.windowWidth + "\n\r 可使用窗口高度：" + info.windowHeight + "\n\r 用户字体大小：" + info.fontSizeSetting + "\n\r 当前网络状态：" + info.networkType + wifiInfo + "\n\r 是否支持NFC：" + info.nfc + benchmarkLevel,
      success: function (res) {
      }
    })
  },
  // 分享
  onShareAppMessage: function () {
    console.log('openid', openid);
    return {
      title: '检测手机真伪小程序', // 分享标题
      path: 'pages/index/index?p_openid=' + openid,
      imageUrl: '../../image/share1.jpg'
    }
  }
})
