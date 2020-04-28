let plugin = requirePlugin("WechatSI");
let manager = plugin.getRecordRecognitionManager();
let timer = null;
Page({
  data: {
    tag: [
      { name: '文字翻译', active: true },
      { name: '对话翻译', active: false }
    ],
    content: '',
    speechContent: '',
    dialogue: [
      { type: 'leftCon', from: '你好', to: 'hello', file: '' },
      { type: 'rightCon', from: 'excuse me', to: '对不起', file: '' },
    ],
    talkFlag: false,
    talkType: 'zh_CN'
  },
  onLoad: function (options) {
    manager.onError = function (res) {
      console.error("error msg", res.msg)
    }
  },
  // 开始录音
  talk (event) {
    let talkType = event.target.dataset.talk;
    this.setData({
      talkFlag: true,
      talkType: talkType
    });
    console.log('start', manager);
    console.log(talkType);
    manager.start({ duration: 30000, lang: talkType });
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    };
  },
  // 停止录音
  stop(event) {
    let talkType = event.target.dataset.talk;
    manager.stop();
    this.setData({
      talkFlag: false,
    });
    console.log('stop', manager);
    manager.onRecognize = function (res) {
      console.log("current result", res.result)
    }
    manager.onStop = function (res) {
      // 录音临时文件地址
      console.log("record file path", res.tempFilePath);
      // 最终识别结果
      console.log("result", res.result);
      let result = '';
      if (talkType === 'zh_CN') {
        //中->英
        this.text('zh_CN', 'en_US', this.data.content, (r) => {
          result = r;
        });
      }
      else {
        //英 -> 中
        this.text('zh_CN', 'en_US', this.data.content, (r) => {
          result = r;
        });
      }
     
      this.setData({
        dialogue: this.data.dialogue.push({
          type: talkType === 'zh_CN' ? 'rightCon' : 'leftCon',
          from: res.result,
          to: result,
          file: res.tempFilePath
        })
      })
    }
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
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setData({
        content: val.detail.value
      });
    }, 1000);
  },
  textTotext (event) {
    let that = this;
    console.log(event);
    if (event.target.dataset.to)
      if (event.target.dataset.to === 'en_US') {
        //中->英
        this.text('zh_CN', 'en_US', this.data.content, (result) => {
          that.setData({
            speechContent: result
          });
        });
      }
      else {
        this.text('en_US', 'zh_CN', this.data.content, (result) => {
          that.setData({
            speechContent: result
          });
        });
      }
  },
  // 文本转文本 翻译
  text (from, to, content, fn) {
    let that = this;
    console.log(content);
    plugin.translate({
      lfrom: from,
      lto: to,
      content: content,
      success: function (res) {
        if (res.retcode == 0) {
          console.log("result", res.result);
          fn(res.result);
        } else {
          console.warn("翻译失败", res)
        }
      },
      fail: function (res) {
        console.log("网络失败", res)
        switch (res.retcode) {
          case -10002:
            wx.showToast({
              title: '输入的待翻译内容格式不正确',
              icon: 'success',
              duration: 2000
            });
            console.log('输入的待翻译内容格式不正确');
            break;
        }
      }
    });
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