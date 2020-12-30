## 小程序检测手机故障
	
- 最全的手机检测程序，检测手机的型号、操作系统、屏幕显示、屏幕触摸、摄像头、喇叭、通话功能、网络、 Wifi、蓝牙、gps定位、手机振动、加速仪、罗盘、屏幕亮度等功能是否正常，
- 实用小功能。
- 分享给好友可查看好友手机设备信息

![小程序码](./image/code.jpg)

## 使用 https://tinypng.com/ 进行图片压缩

使用教程 

复制mtp.js， 

然后只需修改 mtp.js 文件以下代码的，key

```
apiKeyList: [
  // 'XgNgkoyWbdIZd8OizINMjX2TpxAd_Gp3', // 无效 key
  // 'IAl6s3ekmONUVMEqWZdIp1nV2ItJL1PC', // 无效 key
  'b8LL1XQ3RwX3lC752S4zLTtTktDTkrFV', // 有效 key
]
```

key 可以通过 [https://tinify.cn/developers](https://tinify.cn/developers) 来获取

把mtp放到自己项目的根目录，和配置好key之后，

终端 命令行执行 node ./mtp.js  就可以了

可以参考 [无依赖的 tinypng node 脚本](https://segmentfault.com/a/1190000024416860)

