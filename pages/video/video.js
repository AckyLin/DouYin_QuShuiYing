//获取应用实例
var app = getApp(), n = ''
const fsm = wx.getFileSystemManager();
const basepath = `${wx.env.USER_DATA_PATH}`
Page({
    data: {
        videoSrc: '',
        dataUrl: '',
        videoUrl: '',
        myTime:""
    },
  onLoad: function (options) {
        this.setData({
            videoSrc: app.globalData.videoSrc,
            dataUrl: this.getdataUrl('dataUrl'),
            videoUrl: decodeURIComponent(options.videoUrl)
        })
    },
    getdataUrl: function (o) {
        return wx.getStorageSync(o)
    },
    onUnload: function () {
        n && n.abort()
    },
    goBack: function () {
        n ? (n.abort(), setTimeout(function () {
            wx.navigateBack({
                delta: 1
            })
        }, 1e3)) : wx.navigateBack({
            delta: 1
        })
    },
    download: function () {
      var t = this, 
      e = this.data.dataUrl;
        wx.showLoading({
            title: '保存中 0%'
        }), (n = wx.downloadFile({
            url: e,
            success: function (o) {
                wx.hideLoading(), wx.saveVideoToPhotosAlbum({
                  filePath: o.tempFilePath,
                    success: function (o) {
                        t.showToast('保存成功', 'success'), setTimeout(function () {
                            wx.setClipboardData({
                              data: '',
                            })
                            t.goBack()
                        }, 1e3)
                      t.delFile();//删除临时文件
                    },
                    fail: function (o) {
                        t.showToast('保存失败')
                    }
                })

            },
            fail: function (o) {
                n = null, wx.hideLoading(), t.showToast('下载失败')
            }
        }))
        .onProgressUpdate(function (o) {
          debugger
            100 === o.progress ? '' : wx.showLoading({
                title: '保存中 ' + o.progress + '%'
            })
        })
    },
    postSave: function (o) {
        var t = this
        wx.getSetting({
            success: function (o) {
                o.authSetting['scope.writePhotosAlbum'] ? t.download() : wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function () {
                        t.download()
                    },
                    fail: function (o) {
                        wx.showModal({
                            title: '提示',
                            content: '视频保存到相册需获取相册权限请允许开启权限',
                            confirmText: '确认',
                            cancelText: '取消',
                            success: function (o) {
                                o.confirm ? (wx.openSetting({
                                    success: function (o) {
                                      t.download();
                                     }
                                })) : ''
                            }
                        })
                    }
                })
            }
        })
    },
    delFile: function(){
      fsm.readdir({
        dirPath: basepath, /// 获取文件列表
        success(res) {
          res.files.forEach((val) => { // 遍历文件列表里的数据
            if (val.indexOf("mp4") >= 0){
              console.log(val)
              fsm.unlink({
                filePath: basepath + '/' + val
              });
            }
          })
        },
        fail(err) {
          console.log(err)
        },
        complete() {
          console.log('complete')
        }

      })
    },
    showToast: function (o) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'none', n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500
        wx.showToast({
            title: o,
            icon: t,
            duration: n
        })
    }
})
