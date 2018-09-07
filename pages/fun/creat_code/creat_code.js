// pages/fun/creat_code/creat_code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: null,
    imgPath: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindKeyInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      val: e.detail.value
    })
  },
  comfirm: function () {
    let that = this;
    let val = this.data.val;
    if (!val) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    wx.request({
      url: 'https://apis.juhe.cn/qrcode/api?key=76ee00a4a1a6371e70e33693dd26aa56&type=1&fgcolor=00b7ee&w=300&m=5&text=' + val,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_code === 0) {
          that.setData({
            imgPath: 'data:image/png;base64,' + res.data.result.base64_image
          })
        } else {
          wx.showToast({
            title: '请求错误，请重新点击确定',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  save: function () {
    let that = this;
    console.log(that.data.imgPath)
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(that.data.imgPath, 0, 0, 150, 150);

    ctx.draw(true, function () {

      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        destWidth: 150,
        destHeight: 150,
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.log(res)
            }, fail(res) {
              console.log(res)
            }
          })
        }, fail(res) {
          console.log('canvasToTempFilePath', res)
        }
      })

    });
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