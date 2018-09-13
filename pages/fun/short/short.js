// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: null,
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
  shortFun: function (e) {
    let that = this;
    console.log(e)
    let val = this.data.val;
    wx.request({
      url: 'http://api.kks.me/api.php?url='+ val,
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data) {
          that.setData({
            result: res.data
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
  copy: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.target.dataset.result,
      success: function (res) {

      }, fail: function () {
        wx.showToast({
          title: '复制失败，请重新复制',
          icon: 'none',
          duration: 2000
        })
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