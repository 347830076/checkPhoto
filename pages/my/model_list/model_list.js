let app = getApp();
let page = 0; //页数
let pageSize = 10; //条数
let count = null; //总条数
let pages = null; //总页数
Page({
  data: {
    info: [],
    openid: null
  },
  onLoad: function (options) {

  },
  openwin: function (event) { //跳转页面
    let path = event.currentTarget.dataset.url;
    let openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../' + path + '/' + path + '?openid=' + openid
    })
  },
  onReady: function () {

  },
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('openid:', res)
        that.setData({
          openid: res.data
        })
        that.ajax();
      }
    });
  },
  ajax:function(){
    let that = this;
    wx.showLoading({
      title: '请求服务器中...',
      mask:true
    })
    wx.request({
      url: app.globalData.serverUrl + 'getFriendList',
      data: {
        openid: that.data.openid,
        page: page,
        pageSize: pageSize
      },
      method: 'POST',
      success: function (res) {
        console.log('获取好友机型列表', res);
        that.setData({
          info: res.data
        });
        console.log(that.data.info);
        // if (!count){
        //   count = res.data.count;
        //   pages = Math.ceil(count / pageSize);
        //   wx.setNavigationBarTitle({ title: '好友机型（' + count + '）' })
        // }
      }, complete() {
        wx.hideLoading();
      }
    });
  },
  onUnload: function () {
     page = 0; //页数
     pageSize = 10; //条数
     count = null; //总条数
     pages = null; //总页数
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    page++;
    console.log(page,pages);
    if(page < pages){
      this.ajax();
    }else{
      wx.showToast({
        title:'没有更多了',
        icon:'none'
      })
    }
  },

})