// pages/compass/compass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.onCompassChange(function (res) {
      console.log(res.direction);
      that.setData({
        num: Math.round(res.direction)
      })
    })
  },
  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: '罗盘检测完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.compass = 1;
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
              info.compass = 2;
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