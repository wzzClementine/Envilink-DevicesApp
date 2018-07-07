// pages/resident/resident.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_01: false,
    bar_02: true,
    bar_03: true,
    bar_04: true,
    title_div: 1,
    temp:0,
    sd:0,
    comfor: 0,
    health: 0,
    week_electric: 0,
    mon_electric: 0,
    air: 0
  },
  navigateIndex: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  navigateMine: function (e) {
    wx.switchTab({
      url: '../my/my',
    })
  },
  switchBar: function (e) {
    var that = this
    var id = e.currentTarget.id
    if (id == 2) {
      that.setData({
        bar_01: true,
        bar_02: false,
        bar_03: true,
        bar_04: true,
        title_div: 2
      })
    } else if (id == 1) {
      that.setData({
        bar_01: false,
        bar_02: true,
        bar_03: true,
        bar_04: true,
        title_div: 1
      })
    } else if (id == 3) {
      that.setData({
        bar_01: true,
        bar_02: true,
        bar_03: false,
        bar_04: true,
        title_div: 3
      })

    } else if (id == 4) {
      that.setData({
        bar_01: true,
        bar_02: true,
        bar_03: true,
        bar_04: false,
        title_div: 4
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

    this.interval = setInterval(function () {
      var num_comfor = (Math.random() * 1 + (-0.5)).toFixed(2)
      var num_health = (Math.random() * 5 + 40).toFixed(1)
      var num_weekElectric = (Math.random() * 10 + 50).toFixed(2)
      var num_monElectric = (Math.random() * (190 - 200) + 190).toFixed(2)
      var num_air = (Math.random() * 5 + 40).toFixed(0)
      var num_temp = (Math.random() * (29.33-22.18) + 22.18).toFixed(1)
      var num_sd = (Math.random() * (43.00-36.09) + 36.09).toFixed(1)

      that.setData({
        temp:num_temp,
        sd:num_sd,
        comfor: num_comfor,
        health: num_health,
        week_electric: num_weekElectric,
        mon_electric: num_monElectric,
        air: num_air
      })
    }, 2000);
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
})