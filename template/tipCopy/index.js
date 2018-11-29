const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setClip2() {
      wx.setClipboardData({
        data: '7216040',
        success() {
          app.wxFun.showModal({
            content: '已经复制搜索码，赶紧前往支付领红包吧, 记得每天都可以领哦。'
          })
        }
      });
    },
  }
})
