Page({
  data: {
    info: {
      screen_show: 0,
      screen_touch: 0,
      camera: 0,
      trumpet: 0,
      microphone: 0,
      call: 0,
      wifi: 0,
      bluetooth: 0,
      accelerometer: 0,
      compass: 0,
      gps: 0,
      vibrate:0
    }
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'info',
      success: function (res) {
        console.log(res.data)
        that.setData({
          info: res.data
        })
      }
    })
  },
  //跳转页面
  toView: function (e) {
    console.log(e);
    let name = e.currentTarget.dataset.url;
    wx.setStorage({
      key: "info",
      data: this.data.info,
      success: function () {
        wx.navigateTo({
          url: '../' + name + '/' + name
        })
      }, fail: function () {
        wx.showModal({
          title: '温馨提示',
          content: '跳转页面失败，请重新点击',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //手机振动
  vibrate:function(){
    let that = this;
    wx.vibrateLong({
      success:function(){
        let info = that.data.info;
        info.vibrate = 1;
        that.setData({
          info: info
        })
        wx.setStorage({
          key: "info",
          data: info,
          success: function () {
          }
        })
      },fail:function(){

      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '检测手机状况小程序', // 分享标题
      path: 'pages/index/index',
      imageUrl: '../../image/share.jpg'
    }
  }
})