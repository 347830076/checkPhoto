Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      screen_show: 0,
      screen_touch: 0,
      camera: 0,
      trumpet: 0,
      call: 0,
      wifi: 0,
      bluetooth: 0,
      accelerometer: 0,
      compass: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var name = e.target.dataset.url;
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