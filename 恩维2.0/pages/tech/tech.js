var wxCharts = require("../../utils/wxchart.js")
var lineChart = null;
var lineChart01= null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_01:false,
    bar_02: true,
    bar_03: true,
    bar_04:true,
    title_div:1,
    comfor:0,
    health:0,
    week_electric:0,
    mon_electric:0,
    temp:0,
    sd:0,
    air:0,
    index:0,
    myDevices:[]
  },
  //收藏设备到数据库
  collect:function(e){
    wx.request({
      url: '',
      data:'',
      method:'',
      header:{

      },
      success:function(e){
        
      },
      fail:function(e){

      }
    })
  },
  //选择设备后更换数据
  chooseDevices:function(e){
    var that = this 
    that.setData({
      index:e.detail.value
    })
    wx.setStorage({
      key: 'index',
      data: e.detail.value,
    })
    console.log(e.detail.value)
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
  navigateIndex:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  navigateMine:function(e){
    wx.switchTab({
      url: '../my/my',
    })
  },
  //湿度值生成
  createSimulationData: function () {

    var data = [];
    var categories=[];


    //生成是个数组的元素
    for (var i = 10; i <19 ; i++) {
      categories.push(i+'点');
      //生成10-20之间的随机数,即纵坐标的值
      data.push(Math.random() * (41.00 - 36.09) + 36.09);
    }
    //调用createSimulationData函数返回的数据
    return {
      categories: categories,
      data: data
    }

  },
  


  //温度值生成
  createSimulationData01: function () {

    var data = [22.45, 22.78, 22.97, 23.32, 24.67, 25.21, 24.90, 23.88, 23.34];
    var categories = [];

    //生成是个数组的元素
    for (var i = 10; i < 19; i++) {
      categories.push(i + '点');
    }
 
    //调用createSimulationData函数返回的数据
    return {
      categories: categories,
      data: data
    }
  },

  switchBar:function(e){
    var that=this
    var id=e.currentTarget.id
    if(id==2){
       that.setData({
         bar_01:true,
         bar_02:false,
         bar_03: true,
         bar_04: true,
         title_div:2
       })
    }else if(id==1){
      that.setData({
        bar_01: false,
        bar_02: true,
        bar_03: true,
        bar_04: true,
        title_div:1
      })
    }else if(id==3){
      that.setData({
        bar_01: true,
        bar_02: true,
        bar_03: false,
        bar_04: true,
        title_div:3
      })

    }else if(id==4){
      that.setData({
        bar_01: true,
        bar_02: true,
        bar_03: true,
        bar_04: false,
        title_div:4
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    var that = this

    wx.getStorage({
      key: 'selectedDevices',
      success: function(res) {
        console.log(res.data)
        if(res.data.length==0){
          wx.showModal({
            title: '提示',
            content: '当前设备为空,是否要添加设备？',
            success: function (res) {
              if (res.confirm == true) {
                wx.redirectTo({
                  url: '../myDevices/myDevices',
                })
              } else {
                //nothing
              }
            }
          })
        }else{
          that.setData({
            myDevices: res.data
          })
          wx.getStorage({
            key: 'index',
            success: function(res) {
              that.setData({
                index:res.data
              })
            },
          })
        }
      },
    })

    //设置高度
    var windowWidth = 200;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    var simulationData01 = this.createSimulationData01();
    lineChart = new wxCharts({
      //wxml文件里此画布的canvasID的值
      canvasId: 'lineCanvas',
      //选择绘制的图标类型,line表示折线图,可选值为pie, line, column, area, ring, radar
      type: 'line',
      //
      categories: simulationData.categories,
      //animation参数表示图标是否可以动画的形式显示
      animation: false,
      //
      background: 'green',
      //数据列表（即每一条折线图对应的数据）,此图中的两条分别对应;
      series: [{
        name: '湿度',
        data: simulationData.data,
        //2表示控制成2位小数
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      //不绘制x轴网格
      xAxis: {
        disableGrid: true
      },
      //y轴基本配置
      yAxis: {
        title: '湿度值(%)',
        //2表示控制成2位小数
        format: function (val) {
          return val.toFixed(2);
        },
        min: 36 //y轴起始值
      },
      //是否显示图列
      legend: false,
      //图标宽度
      width: windowWidth - 10,
      //图表高度
      height: 170,
      //是否显示坐标点的标签,即对应的数值
      dataLabel: true,
      //坐标点是否显示
      dataPointShape: true,
      //仅对line, area图表有效,可选值：curve曲线，straight直线 (default)
      extra: {
        lineStyle: 'curve'
      }
    });




    //温度值曲线
    lineChart01 = new wxCharts({
      //wxml文件里此画布的canvasID的值
      canvasId: 'lineCanvas01',
      //选择绘制的图标类型,line表示折线图,可选值为pie, line, column, area, ring, radar
      type: 'line',
      //
      categories: simulationData01.categories,
      //animation参数表示图标是否可以动画的形式显示
      animation: false,
      //
      background: 'green',
      //数据列表（即每一条折线图对应的数据）,此图中的两条分别对应;
      series: [{
        name: '温度',
        data: simulationData01.data,
        //2表示控制成2位小数
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      //不绘制x轴网格
      xAxis: {
        disableGrid: true
      },
      //y轴基本配置
      yAxis: {
        title: '温度值(℃)',
        //2表示控制成2位小数
        format: function (val) {
          return val.toFixed(2);
        },
        min: 22 //y轴起始值
      },
      //是否显示图列
      legend: false,
      //图标宽度
      width: windowWidth - 10,
      //图表高度
      height: 170,
      //是否显示坐标点的标签,即对应的数值
      dataLabel: true,
      //坐标点是否显示
      dataPointShape: true,
      //仅对line, area图表有效,可选值：curve曲线，straight直线 (default)
      extra: {
        lineStyle: 'curve'
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that=this

    var base_week = 50;
    var base_mon = 180;
    var min = 1;

    function getRandomWeek(min) {
      return Math.random() * 10 + min;
    }
    function getRandomMon(min) {
      return Math.random() * 10 + min;
    }

    this.interval = setInterval(function () {
      
      var num_temp = (Math.random() * (29.33-22.18) + 22.18).toFixed(2)
      var num_sd = (Math.random() *(43-36.9) + 36.9).toFixed(2)


      var min_week = getRandomWeek(min + 1);
      var min_mon = getRandomMon(min + 1);

      var num_comfor = (Math.random()*1+(-0.5)).toFixed(2)
      var num_health = (Math.random()*5+40).toFixed(1)

      var num_weekElectric = (base_week + min_week).toFixed(2)
      var num_monElectric = (base_mon + min_mon).toFixed(2)


      var num_air = (Math.random()*5+40).toFixed(0)

  
      that.setData({
        temp:num_temp,
        sd:num_sd,
        comfor: num_comfor,
        health:num_health,
        week_electric:num_weekElectric,
        mon_electric:num_monElectric,
        air:num_air
      })
 

    }, 2000);
  },


  updateData: function () {
  
    var simulationData = this.createSimulationData();
    

    var series = [{
      name: '湿度',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2);
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
    
      
   

    var simulationData01 = this.createSimulationData01();

    var series01 = [{
      name: '温度',
      data: simulationData01.data,
      format: function (val, name) {
        return val.toFixed(2);
      }
    }];
    lineChart01.updateData({
      categories: simulationData01.categories,
      series: series
    });

    
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