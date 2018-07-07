//index.js
//获取应用实例
var app = getApp()
Page({
  data: {},
  //四个模块的跳转
  turnToTech:function(e){
    wx.navigateTo({
      url: '../tech/tech',
    })
  },
  turnToResident: function (e) {
    wx.navigateTo({
      url: '../resident/resident',
    })
  },
  turnToManage: function (e) {
    wx.navigateTo({
      url: '../manage/manage',
    })
  },
  turnToIntro: function (e) {
    wx.navigateTo({
      url: '../intro/intro',
    })
  },

  //分享
  onShareAppMessage: function () {
    return {
      title: '长江流域示范工程',
      path: '/pages/index/index',

      success: function (res) {
        // 转发成功
        console.log('successful!')
      },
      fail: function (res) {
        // 转发失败
        console.log('failed!')
      }
    }

  },

  onLoad: function () {

  },


})
