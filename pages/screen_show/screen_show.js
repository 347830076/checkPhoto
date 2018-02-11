Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: 'black',
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '温馨提示',
      content: '点击屏幕切换颜色检测屏幕显示是否有花点',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击屏幕
  clickScreen: function () {
    var that = this;
    var num = that.data.num;
    that.setData({
      num: ++num
    })
    if (num == 1) {
      that.setData({
        bgColor: 'black'
      })
    } else if (num == 2) {
      that.setData({
        bgColor: 'white'
      })
    } else if (num == 3) {
      that.setData({
        bgColor: 'blue'
      })
    } else if (num == 4) {
      that.setData({
        bgColor: 'yellow'
      })
    } else {
      wx.getStorage({
        key: 'info',
        success: function (res) {
          console.log(res.data)
          var info = res.data;
          wx.showModal({
            title: '',
            content: '屏幕显示测试完毕，是否通过',
            cancelText: '不通过',
            confirmText: '通过',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                info.screen_show = 1;
                wx.setStorage({
                  key: "info",
                  data: info,
                  success: function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, fail: function () {
                    that.tipFun();
                  }
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
                info.screen_show = 2;
                wx.setStorage({
                  key: "info",
                  data: info, 
                  success: function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, fail: function () {
                    that.tipFun();
                  }
                })
              }
            }
          })
        },fail:function(){
          that.tipFun();
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tipFun:function(){
    wx.showModal({
      title: '温馨提示',
      content: '保存数字有误，请重新点击',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
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