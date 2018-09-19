let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  openwin: function (event) { //跳转页面
    let path = event.currentTarget.dataset.url;
    let openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../' + path + '/' + path + '?openid=' + openid
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
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('openid:', res)
        wx.showLoading({
          title:'请求服务器中...'
        })
        wx.request({
          url: app.globalData.serverUrl + 'Home/Small/getFriendModel',
          data: {
            openid: res.data
          },
          method: 'GET',
          success: function (res) {
            console.log('获取好友机型列表', res);
            if (res.data.code === '1') {
              that.setData({
                info: res.data.data
              })
            }
          },complete(){
            wx.hideLoading();
          }
        });
      }
    });
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

})