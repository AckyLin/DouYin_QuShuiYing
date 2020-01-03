# DouYin_QuShuiYing
##### 抖音视频去水印微信小程序 记得替换你的appid
### 解析接口是普通接口只能解析短视频
#### 其中用到了读取剪辑版数据和相册保存
### 注意！！！！务必在微信小程序后台添加以下域名
##### request合法域名
https://aweme.snssdk.com
https://v.ataobao.vip
https://www.i847.cn
##### downloadFile合法域名
https://aweme.snssdk.com
https://www.i847.cn

##### 剪辑版数据
```
    wx.getClipboardData({
      success: res => {
        var str = res.data.trim()
        if (str) {
          that.setData({
            defaultUrl: str
          })
        }
      }
    })
    wx.setClipboardData({
      data: '',
    })
```
##### 保存相册视频
```
wx.saveVideoToPhotosAlbum({
   filePath: file.tempFilePath,
   success: function (o) {
       t.showToast('保存成功', 'success'), setTimeout(function () {
           wx.setClipboardData({
             data: '',
           })
           that.goBack()
       }, 1000)
   },
   fail: function (o) {
       that.showToast('保存失败')
   }
})
```

![AckyLin](https://github.com/AckyLin/DouYin_QuShuiYing/blob/master/1.png)
![AckyLin](https://github.com/AckyLin/DouYin_QuShuiYing/blob/master/2.jpg)
