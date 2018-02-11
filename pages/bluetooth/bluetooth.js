// pages/bluetooth/bluetooth.js
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
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '温馨提示',
          content: '蓝牙检测完毕，通过',
          showCancel: false,
          confirmText: '通过',
          success: function (res) {
            wx.getStorage({
              key: 'info',
              success: function (res) {
                // console.log(res.data)
                var info = res.data;
                info.bluetooth = 1;
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
        })
      },fail:function(res){
        console.log('fail',res)
        if(res.errCode == '10001'){
          wx.showModal({
            title: '温馨提示',
            content: '请打开蓝牙进行测试',
            showCancel:false,
            success: function (res) {
              wx.navigateBack({
                delta: 1
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