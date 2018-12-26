import wxFun from 'utils/wxFun';
let fundebug = require('./utils/fundebug.0.9.0.min.js');
fundebug.init(
{
  silent: false,//安静模式，开发环境下为true，生产环境为false
  apikey: '34331d519b90730aa28d5eb2ca806c50a26212665724905f09cc29d4f673d18c',
  monitorHttpData: true,//收集请求错误的body(即wx.request的data参数)
  setSystemInfo: true,//收集请求错误的用户的系统信息，比如操作系统，微信版本等等:
  silentConsole: true,
  silentInject: true
});

App({
  wxFun,
  onLaunch: function () {
    fundebug.notify("Test", "Hello, Fundebug!");
  },
  globalData: {
    userInfo: null,
    serverUrl: 'https://test.showhtml5.cc/',
    // serverUrl:'http://myphp.localhost.com/',
  },
  // 小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  onError(msg) {
    fundebug.notify("onError函数", msg);
  }
})