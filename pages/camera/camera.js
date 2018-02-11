// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  camera: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(res)
        that.setData({
          imgSrc: tempFilePaths
        })
      }
    })
  },
  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: '摄像头检测完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.camera = 1;
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
              info.camera = 2;
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  }
})