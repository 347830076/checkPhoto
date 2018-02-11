// pages/gps/gps.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false
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
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          success:function(){
            wx.getStorage({
              key: 'info',
              success: function (res) {
                // console.log(res.data)
                var info = res.data;
                info.gps = 1;
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
          },fail:function(){
            wx.getStorage({
              key: 'info',
              success: function (res) {
                // console.log(res.data)
                var info = res.data;
                info.gps = 2;
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
      }
    })

  },
  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: 'gps完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.gps = 1;
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
              info.gps = 2;
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