// pages/fun/cookbook_detail/cookbook_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{
      title: '还能用几年？',
      flag: false,
      content: '这个小程序会一直免费提供功能给大家使用。只要微信不倒，不封号就可以用。'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
  
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
  
    wx.request({
      url: 'https://route.showapi.com/1164-1',
      data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": '74326', //这里需要改成自己的appid
        "showapi_sign": '6256b66438464c2189542eddcb373374',  //这里需要改成自己的应用的密钥secret
        "type": options.type_,
        // "id": options.id,
        "cpName": options.cpname,
        "maxResults": "50",
        "page": "1"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.showapi_res_body) {
          if (res.data.showapi_res_body.datas && res.data.showapi_res_body.datas.length){
            that.setData({
              data: res.data.showapi_res_body.datas
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '未找到相关菜谱',
              showCancel:false,
              success: function (res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
          
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
  taggle: function (event) {
    var index = event.target.dataset.index;
    var data = this.data.data;
    for (var i = 0; i < data.length; i++) {
      if (index == i) {
        data[i].flag = !data[i].flag;
      }
    }
    this.setData({
      data: data
    })
  },
  previewImage:function(e){
    var url = e.target.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
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
  onShow: function (options) {
    
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