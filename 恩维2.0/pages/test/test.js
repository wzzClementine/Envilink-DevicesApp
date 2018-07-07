// pages/test/test.js

var Paho= require("../../utils/Paho.js");
var sign = require("../../utils/computeURL.js");

var options={
    accessKey: 'AKIAOUJ7ACAQHTPXUQLA',
    secretKey: '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',
    endpoint: 'a2zejfk5ipsih8.iot.cn-north-1.amazonaws.com.cn',
    clientId: '123',
    regionName: 'cn-north-1'
};



Page({

 
  data: {
    topic:'',
    testData:['163','baidu','goole','souhu','qq'],
    index:0
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     var url = sign.computeUrl();
  
     console.log('test.js');
     console.log(url);

     var client = new Paho.MQTT.Client(url, 'someClientId');
     var connectOptions = {
         onSuccess: function () {
             // connect succeeded
             console.log('YES!!!!');
             client.connected=true;
             
             client.subscribe('envicloud/devices/dummy/#', {
               onSuccess: function () {
                 console.log('subscribeSuccess!');
                 console.log('info',client.msgs.msg);
               },
               onFailure: function () {
                 console.log('subscribeFalied!');
               }
             });

         },
         useSSL: true,
         timeout: 3,
         mqttVersion: 4,
         onFailure: function () {
             // connect failed
             console.log('NO!!!!');
         }
     };

     //连接到iot
     client.connect(connectOptions);

     

     


  },
//测试get请求
testGetRequest:function(e){
  var that=this
  that.setData({
    index:e.detail.value
  })
  wx.request({
    url: 'https://www.shananchuanmei.com/shanyi/wx/user/corp/get_all',
    method: 'GET',
    success: function (res) {
      console.log(res.data)
    }

  })

},
  //subscribe订阅话题
subscribe:function(e){

},

  //publish发布话题

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})