// pages/myDevices/myDevices.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    devices:['无','温湿度探测器','电耗探测器','其他设备'],
    selectedDevices:[],
    compareDevices:[],
    isChange:true,
    isShow:false,
    idOfDevices:0,
    nameOfDevice:'',
    record:'',
  },
  //查询设备跳转
  searchResult:function(e){
    wx.navigateTo({
      url: '../searchDevices/searchDevices',
    })
  },
  //将选择的设备加入我的设备中
  chooseDevices:function(e){
     var that=this
     
     var id=e.detail.value
     var devices=this.data.selectedDevices
     var comDevices=this.data.compareDevices
     var deviceAll=this.data.devices
     var isAdd=false

     for(var i=0;i<comDevices.length;i++){
       if(comDevices[i]==deviceAll[id]){
           isAdd=true
       }
     }
     if(id!=0&&isAdd==false){
       devices.push(deviceAll[id])
       comDevices.push(deviceAll[id])
       that.setData({
         index: e.detail.value,
         selectedDevices: devices,
         compareDevices:comDevices
       })
       wx.setStorage({
         key: 'selectedDevices',
         data: devices,
       })
       wx.setStorage({
         key: 'compareDevices',
         data: comDevices,
       })
       wx.showToast({
         title: '添加成功!',
         icon:'success',
         duration:1000
       })
     } else if (isAdd == true){
       wx.showToast({
         title: '已经添加过该设备!',
         image:'../image/attention02.png',
         duration: 2000
       })
     }
  },
  //删除已选择的设备
  deleteDevices:function(e){
    var that=this
    var index=e.currentTarget.id
    var devices = this.data.selectedDevices
    var comDevices = this.data.compareDevices
    wx.showModal({
      title: '提示',
      content: '是否要删除该设备？',
      success:function(res){
        if(res.confirm==true){
          devices.splice(index, 1)
          comDevices.splice(index, 1)
          that.setData({
            selectedDevices: devices,
            compareDevices: comDevices
          })
          wx.setStorage({
            key: 'selectedDevices',
            data: devices,
          })
          wx.setStorage({
            key: 'compareDevices',
            data: comDevices,
          })
        }else{
          //nothing
        }
      }
    })
  },
  //修改设备名称
  showChangeInput:function(e){
    var that=this
    var devices = this.data.selectedDevices
    var id = e.currentTarget.id
    that.setData({
      isChange:false,
      isShow:true,
      idOfDevices:e.currentTarget.id,
      nameOfDevice:devices[id]
    })

  },
  changeName:function(e){
    var that = this

    var id=this.data.idOfDevices
    var name = e.detail.value
    var devices= this.data.selectedDevices

    devices[id]=e.detail.value
    console.log(devices[id])

    that.setData({
      isChange: true,
      selectedDevices:devices
    })
    wx.setStorage({
      key: 'selectedDevices',
      data: devices,
    })
  },

  //记录名字
  recordName:function(e){
    var that=this
    var recordname = e.detail.value;
    that.setData({
      record:recordname
    })
    console.log(record)
  },

  //取消
  cancelChange:function(e){
    var that = this
    that.setData({
      isChange: true,
    })
  },

  //确定
  confirmChange:function(e){
    var that = this

    var id = this.data.idOfDevices

    var name = this.data.record
    console.log(name)

    var devices = this.data.selectedDevices

    devices[id] = name
    console.log(devices[id])

    that.setData({
      isChange: true,
      selectedDevices: devices
    })
    wx.setStorage({
      key: 'selectedDevices',
      data: devices,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
     wx.getStorage({
       key: 'selectedDevices',
       success: function(res) {
          that.setData({
             selectedDevices:res.data
          })
       },
     })
  },

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