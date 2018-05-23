Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: '50%',
    top: '50%'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var currentX = 0, currentY = 0, x = 0, y = 0, z = 0, cx = 0, cy = 0;
    var flag = true;
    wx.onAccelerometerChange(function (res) {
      x = res.x;
      y = res.y;
      z = res.z;

      cx = (x - currentX) * 100 + 50;
      cx = cx >= 100 ? 100 : cx;
      cx = cx <= 0 ? 0 : cx;

      cy = (currentY - y) * 100 / 2 + 50;
      cy = cy >= 100 ? 100 : cy;
      cy = cy <= 0 ? 0 : cy;

      that.setData({
        left: cx + '%',
        top: cy + '%',
        x: (x).toFixed(2),
        y: (y).toFixed(2),
        z: (z).toFixed(2)
      });
      // console.log(res.x)
      // console.log(res.y)
      // console.log(res.z)
    });
  },
  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: '加速仪检测完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.accelerometer = 1;
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
              info.accelerometer = 2;
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