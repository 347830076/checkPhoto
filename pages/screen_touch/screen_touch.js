var flag = true;
var info = {};
Page({
  data: {
    colorArr: [
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }],
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }],
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }],
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }],
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }],
      [{ class: 0 }, { class: 0 }, { class: 0 }, { class: 0 }]
    ], 
    height: '0',
    marginB: '0',
    windowHeight:0,
    windowWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          height: res.windowHeight * 0.163 + 'px',
          marginB: res.windowHeight * 0.0044 + 'px',
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth 
        })
      }
    });
    wx.getStorage({
      key: 'info',
      success: function (res) {
        info = res.data;
        info.screen_touch = 2;
        wx.setStorage({
          key: "info",
          data: info,
          success: function () {
           
          }, fail: function () {
          }
        })
      }, fail: function () {
      }
    })

  },
  //触摸单元格
  touchCell: function (e) {
    if(!flag){
      return false;
    }
    var colorArr = this.data.colorArr;
    var windowHeight = this.data.windowHeight;
    var windowWidth = this.data.windowWidth;

    var indexX = e.touches[0].pageX;
    var indexY = e.touches[0].pageY;
    
    for(var y = 0; y < 6; y++){
      for(var x = 0; x < 4; x++){
        if (indexX > (windowWidth / 4) * (x) && indexX < (windowWidth / 4) * (x + 1) && indexY > (windowHeight / 6) * (y) && indexY < (windowHeight / 6) * (y + 1)) {
          // console.log(x, y)
          colorArr[y][x] = 1;
          this.setData({
            colorArr: colorArr
          })
          this.checkTouch();
        }
      }
    }
  },
  //检查是否全部触摸单元格
  checkTouch:function(){
    var colorArr = this.data.colorArr;
    var flag_check = true;
    for(var i = 0; i < colorArr.length; i++){
      for(var j = 0; j < colorArr[i].length; j++){
        if(colorArr[i][j].class == 0){
          flag_check = false;
        }
      }
    }
    if (flag_check){
      flag = false;
      info.screen_touch = 1;
      wx.setStorage({
        key: "info",
        data: info,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }, fail: function () {
        }
      })
    }
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
    flag = true;
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