// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a_electric:0,
    b_electric:0
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

    var baseA = 40000;
    var min = 100;
    function getRandomA(min) {
      return Math.random() * 100 + min;
    }
    function getRandomB(min) {
      return Math.random() * 100 + min;
    }

    this.interval = setInterval(function () {


      var min_a = getRandomA(min + 1);
      var min_b = getRandomB(min + 1);
      var num_a = (baseA + min_a).toFixed(2);
      var num_b = (baseA + min_b).toFixed(2);


      that.setData({
        a_electric: num_a,
        b_electric: num_b,
      })
  
    }, 2000);
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
})