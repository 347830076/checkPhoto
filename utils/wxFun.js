import regeneratorRuntime from 'regenerator-runtime/runtime';

class wxFun {
  /**
   * @desc 分享
   * page 分享路径 默认当前路径
   * params 分享参数 {}
   * imageUrl 图片路径 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
   * title 分享标题 ’‘ 默认 亿脉生活
   * */
  shareAppMessage(options) {
    //当前路径
    let pages = getCurrentPages();
    let cp = pages[pages.length - 1].__route__;

    let $path = options.page ? options.page : cp;
    if (options.params) {
      let str = '';
      for (let i in options.params) {
        str += `&${i}=${options.params[i]}`;
      }
      $path += '?' + str.substr(1);
    }
    console.log('$path==', $path);
    return {
      title: options.title || '亿脉生活',
      imageUrl: options.imageUrl || null,
      path: $path
    }
  }

  // 测试头部导航标题
  setNavigationBarTitle(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }

  // 显示头部导航loading
  showNavigationBarLoading($isTitle) {
    wx.showNavigationBarLoading();
    if ($isTitle) {
      this.setNavigationBarTitle('正在加载中')
    }
  }

  // 隐藏头部导航loading
  hideNavigationBarLoading(isTitle) {
    wx.hideNavigationBarLoading();
    if (isTitle) {
      this.setNavigationBarTitle('');
    }
    wx.stopPullDownRefresh();
  }

  //显示 loading 提示框
  showLoading(title = '加载中...') {
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  //hide loading 提示框
  hideLoading() {
    wx.hideLoading();
  }

  // 消息提示框
  showToast(obj) {
    wx.showToast({
      icon: obj && obj.icon ? obj.icon : 'none',
      duration: obj && obj.duration ? obj.duration : 2000,
      title: obj && obj.title ? obj.title : '即将开放'
    });
  }

  //显示模态对话框
  showModal(obj) {
    console.log(obj.showCancel)
    wx.showModal({
      title: obj && obj.title || '温馨提示',
      showCancel: obj && obj.showCancel,
      cancelColor: obj && obj.cancelColor || '#000',
      cancelText: obj && obj.cancelText || '取消',
      confirmColor: obj && obj.confirmColor || '#3cc51f',
      confirmText: obj && obj.confirmText || '确定',
      content: obj && obj.content || '手机检测欢迎您',
      success(res) {
        if (res.confirm) {
          obj && obj.confirm && obj.confirm();
        } else if (res.cancel) {
          obj && obj.cancel && obj.cancel();
        }
      }
    })
  }

  //返回
  back(num = 1) {
    wx.navigateBack({
      delta: num
    });
  }

  /**关闭所有的页面，回到首页*/
  home() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }

  /**
   * page 页面的路径
   * params 页面的参数 => Object
   * */
  previewImage($allImgAttr, $index) {
    wx.previewImage({
      current: $allImgAttr[$index],
      urls: $allImgAttr
    })
  }

  /**
   * @description 读取本地存储，
   * @param {string} 要读取的key
   * @todo 读取本地存储，判断key只能是string且非纯空格 如果不是将报错
   */
  async getStorage(key) {

    if (typeof key != "string") {
      throw new Error("key is typeof string at wxFun.getStorage");
      return false;
    }

    if (key.trim() == "") {
      throw new Error("key is not null at wxFun.getStorage");
      return false;
    }

    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key.trim(),
        success: function(res) {
          let result = res.data;
          resolve(result)
        },
        fail(e) {
          reject(e);
        }
      })
    });
  }

  /**
   * @description 设置本地存储，
   * @param { string } 存储的key
   * @param { * } 存储的内容
   * @todo 设置本地存储，判断key只能是string且非纯空格 如果不是将报错，
   */
  async setStorage(key, data) {

    if (typeof key != "string") {
      throw new Error("key is typeof string at wxFun.setStorage");
      return false;
    }

    if (key.trim() == "") {
      throw new Error("key is not null at wxFun.setStorage");
      return false;
    }

    return await new Promise((resolve, reject) => {
      wx.setStorage({
        key: key.trim(),
        data,
        success: function(res) {
          resolve({
            msg: "setStorage okey",
          })
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  /**
   * @description 清理本地存储，
   * @param { string } 存储的key（为空将清空所有）
   * @todo 清理本地存储，如果key为空则清空所有，如果key不为空则清空指定的key
   */
  async rmStorage(key = "") {
    if (typeof key != "string") {
      throw new Error("key is typeof string at wxFun.rmStorage");
      return false;
    }
    return new Promise((resolve, reject) => {
      if (key == "") {
        wx.clearStorage({
          success() {
            resolve({
              msg: "clearStorage is okey"
            })
          }
        })
      } else {
        wx.removeStorage({
          key: key.trim(),
          success() {
            resolve({
              msg: "removeStorage is okey"
            })
          },
          fail(e) {
            reject(e);
          }
        })
      }
    })
  }

  // 可以通过 wx.getSetting 先查询一下用户是否授权了
  //例子：pagesIndex/goodsDetail/goodsDetail
  authSetting(str) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          console.log(res)
          if (Object.keys(res.authSetting).length == 0 || !(str in res.authSetting) || res.authSetting[str]) {
            resolve(true)
          } else {
            resolve(false)
          }
        },fail(e){
          reject(e);
        }
      })
    })
  }

  /**
   * @param fn {Function}   实际要执行的函数
   * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
   * @return {Function}     返回一个“去弹跳”了的函数
   */
  // 去抖动函数 (使用场景，输入框连续输入的时候，延迟最后才执行一次)
  debounce(fn, delay) {
    // 定时器，用来 setTimeout
    let timer;
    delay || (delay = 100);
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function() {
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this;
      let args = arguments;
      // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
      clearTimeout(timer);
      // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
      // 再过 delay 毫秒就执行 fn
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  }

  /**
   * @param fn {Function}   实际要执行的函数
   * @param delay {Number}  执行间隔，单位是毫秒（ms）
   * @return {Function}     返回一个“节流”函数
   */
  // 节流阀函数 (节流就是提交表单的时候  用户连续点击了5次  但是我们规定N秒之内 只会提交一次)
  throttle(fn, threshhold) {
    let last; // 记录上次执行的时间
    let timer; // 定时器
    threshhold || (threshhold = 500); // 默认间隔为 500ms

    return function() { // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this
      let args = arguments;
      let now = +new Date();

      // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
      // 执行 fn，并重新计时
      if (last && now < last + threshhold) {
        // clearTimeout(timer)
        // // 保证在当前时间区间结束后，再执行一次 fn
        // timer = setTimeout(function () {
        //   last = now
        //   fn.apply(context, args)
        // }, threshhold)

        // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
      } else {
        last = now;
        fn.apply(context, args);
      }
    }
  }

  //倒计时函数
  repeat(time, callbcak) {
    let that = this;
    if (time > 0) {
      callbcak(time);
      time--;
      setTimeout(function() {
        that.repeat(time, callbcak);
      }, 1000);
    } else {
      callbcak(0);
    }
  }

}

/**
 * @public
 * @author jinzhenzong
 * @description 为string新增方法，trim为string去掉两端空格
 */
// String.prototype.trim = function() {
//   return this.replace(/(^\s*)|(\s*$)/g, "");
// }


module.exports = new wxFun;