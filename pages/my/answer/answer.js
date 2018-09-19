
Page({
  data: {
    contentFlag1: true,
    data: [{
      title: '还能用几年？',
      flag: false,
      content: '只要微信不倒，不封号，这个小程序会一直免费提供功能给大家使用。'
    }]
  },
  onLoad: function (options) {

    // 生命周期函数--监听页面加载

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
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})