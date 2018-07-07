// pages/my/my.js

var Paho = require("../../utils/Paho.js");
var sign = require("../../utils/computeURL.js");
var app = getApp();

var requestUrl = sign.computeUrl();
var client = new Paho.MQTT.Client(requestUrl, "clientId");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
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
  //跳转部分
  turnToMyDevices:function(e){
    wx.navigateTo({
      url: '../myDevices/myDevices',
    })
  },
  turnToAttentionEquipment:function(e){
    wx.navigateTo({
      url: '../attentionEquipment/attentionEquipment',
    })
  },
  turnToAbout: function (e) {
      wx.navigateTo({
        url: '../about/about',
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log("haha");
 /*     
      function initClient(requestUrl) {
          var clientId = String(Math.random()).replace('.', '');
          var client = new Paho.MQTT.Client(requestUrl, clientId);
          var connectOptions = {
              onSuccess: function () {
                  console.log('connected');
              },
              useSSL: true,
              timeout: 3,
              mqttVersion: 4,
              onFailure: function () {
                  console.error('connect failed');
              }
          };
          client.connect(connectOptions);

          client.onMessageArrived = function (message) {

              try {
                  console.log("msg arrived: " + message.payloadString);
                  draw(JSON.parse(message.payloadString));
              } catch (e) {
                  console.log("error! " + e);
              }

          };
      }

*/


    
      client.onConnectionLost = function (responseObject) {
          if (responseObject.errorCode !== 0) {
              console.log("onConnectionLost:" + responseObject.errorMessage);
          }
      }
      client.connect({
          useSSL: true,
          cleanSession: false,
          keepAliveInterval: 60,
          onSuccess: function () {
              console.log('connected');
              client.subscribe("test/topic", {
                  qos: 1
              });
          },
          onFailure: function () {
              console.error('connect failed');
          }
      });


      //var requestUrl = sign.computeUrl();
      //initClient(requestUrl);


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