let openid = null;
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          brand: res.brand,
          model: res.model,
          system: res.system,
          language: res.language
        })
      }
    })
    var that = this;
    wx.getStorage({
      key: 'info',
      success: function (res) {
        console.log(res.data)
        that.setData({
          info: res.data
        })
      }
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('openid:', res)
        openid = res.data;
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
    return {
      title: '检测手机状况小程序', // 分享标题
      path: 'pages/index/index?p_openid=' + openid,
      imageUrl: '../../image/share.jpg'
    }
  }
})