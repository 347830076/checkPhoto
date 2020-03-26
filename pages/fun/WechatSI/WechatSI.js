let plugin = requirePlugin("WechatSI");
Page({
  data: {
    tag: [
      { name: '文字翻译', active: true },
      { name: '对话翻译', active: false }
    ],
    content: '',
    speechContent: '',
  },
  onLoad: function (options) {
    // let manager = plugin.getRecordRecognitionManager()
    // manager.onRecognize = function (res) {
    //   console.log("current result", res.result)
    // }
    // manager.onStop = function (res) {
    //   console.log("record file path", res.tempFilePath)
    //   console.log("result", res.result)
    // }
    // manager.onStart = function (res) {
    //   console.log("成功开始录音识别", res)
    // }
    // manager.onError = function (res) {
    //   console.error("error msg", res.msg)
    // }
    // manager.start({ duration: 30000, lang: "zh_CN" })
  },
  // 切换翻译类型
  tagFun (event) {
    console.log(event);
    let tagArr = this.data.tag.map(res => {
      res.active = false;
      return res;
    });
    tagArr[event.target.dataset.index].active = true;
    this.setData({
      tag: tagArr
    });
  },
  // 监听输入
  tBindinput (val) {
    console.log(val);
    setTimeout(() => {
      this.setData({
        content: val.detail.value
      });
    }, 1000);
  },
  textTotext (event) {
    console.log(event);
    if (event.target.dataset.to)
      if (event.target.dataset.to === 'en') {
        //中->英
        this.text('zh_CN', 'en_US', this.data.content);
      }
      else {
        this.text('en_US', 'zh_CN', this.data.content);
      }
  },
  // 文本转文本 翻译
  text (from, to, content) {
    let that = this;
    console.log(content);
    plugin.translate({
      lfrom: from,
      lto: to,
      content: content,
      success: function (res) {
        if (res.retcode == 0) {
          console.log("result", res.result);
          that.setData({
            speechContent: res.result
          });
        } else {
          console.warn("翻译失败", res)
        }
      },
      fail: function (res) {
        console.log("网络失败", res)
        switch (res.retcode) {
          case -10002:
            console.log('输入的待翻译内容格式不正确');
            break;
        }
      }
    })
  },
  // 文本转语音
  textToSpeech (lang, content) {
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: "一个常见的需求",
      success: function (res) {
        console.log("succ tts", res.filename)
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
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