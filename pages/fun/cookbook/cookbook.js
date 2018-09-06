// pages/fun/cookbook/cookbook.js
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
    let that = this;
    function formatterDateTime() {
      var date = new Date()
      var month = date.getMonth() + 1
      var datetime = date.getFullYear()
        + ""// "年"
        + (month >= 10 ? month : "0" + month)
        + ""// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
          .getDate())
        + ""
        + (date.getHours() < 10 ? "0" + date.getHours() : date
          .getHours())
        + ""
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
          .getMinutes())
        + ""
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
          .getSeconds());
      return datetime;
    }
    return false;
    wx.request({
      url: 'http://route.showapi.com/1164-2',
      data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": '74326', //这里需要改成自己的appid
        "showapi_sign": '6256b66438464c2189542eddcb373374',  //这里需要改成自己的应用的密钥secret
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.showapi_res_body) {
          that.setData({
            info: res.data.showapi_res_body
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