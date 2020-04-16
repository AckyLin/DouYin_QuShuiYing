# DouYin_QuShuiYing
##### 抖音视频去水印微信小程序 记得替换你的appid
### 解析接口是普通接口只能解析短视频
#### 其中用到了读取剪辑版数据和相册保存
### 注意！！！！务必在微信小程序后台添加以下域名
##### request合法域名
https://aweme.snssdk.com \
https://v.ataobao.vip \
##### downloadFile合法域名
  
https://aweme.snssdk.com \
https://v1-dy.ixigua.com \
https://v26-dy.ixigua.com \
https://v3-dy-c.ixigua.com \
https://v3-dy-d.ixigua.com \
https://v3-dy-x.ixigua.com \
https://v3-dy-z.ixigua.com \
https://v3-dy.ixigua.com \
https://v5-dy-a.ixigua.com \
https://v6-dy-x.ixigua.com \
https://v6-dy-y.ixigua.com \
https://v6-dy-z.ixigua.com \
https://v6-dy.ixigua.com \
https://v9-dy-z.ixigua.com \
https://v9-dy.ixigua.com \

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
