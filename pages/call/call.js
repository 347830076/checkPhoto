Page({
  data: {
    flag: false
  },
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '10086', //仅为示例，并非真实的电话号码
      complete: function () {
        that.setData({
          flag: true
        })
      }
    })
  },
  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: '喇叭检测完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.call = 1;
              wx.setStorage({
                key: "info",
                data: info,
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.call = 2;
              wx.setStorage({
                key: "info",
                data: info,
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  }
})