const app = getApp();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    flag: false,
    record: true,
  },
  onReady(){
    let that = this;
    innerAudioContext.onPlay((res) => {
      console.log('监听开始播放')
    })
    innerAudioContext.onEnded((res) => {
      console.log('监听音频自然播放至结束的事件')
    })
    innerAudioContext.onError(function () {
      console.log('监听音频播放错误事件')
    })
  },
  onShow() {
    let that = this;
    app.wxFun.authSetting('scope.record').then((res) => {
      that.setData({
        record: res
      })
    })
  },
  //开始录音
  startRecode: function () {
    let that = this;
    console.log("start");
    const options = {
      duration: 10000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart((res) => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log('错误回调', res);
      app.wxFun.authSetting('scope.record').then((res) => {
        that.setData({
          record: res
        })
      })
    })

  },
  //结束录音 
  endRecode: function () {
    console.log("end");
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('停止录音', res);
      this.setData({
        voice: res.tempFilePath
      })
    })
  },

  //播放声音
  play: function () {
    console.log(this.data.voice);
    if (!this.data.voice){
      app.wxFun.showToast({
        title:'请先录音'
      });
      return false;
    }
    innerAudioContext.src = this.data.voice;
    innerAudioContext.play();
  },

  //检测完毕
  over: function () {
    wx.showModal({
      title: '温馨提示',
      content: '麦克风检测完毕，是否通过？',
      cancelText: '不通过',
      confirmText: '通过',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'info',
            success: function (res) {
              // console.log(res.data)
              var info = res.data;
              info.microphone = 1;
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
              info.microphone = 2;
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
  onShareAppMessage: function () {

  }
})