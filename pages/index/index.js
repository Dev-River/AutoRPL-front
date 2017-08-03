//index.js
//获取应用实例
var app = getApp()
var task = [];
var task1 = { "expired": true, "user": "someone", "starttime": "2017-08-01 20:00", "endtime":"2017-08-03 19:59"};
task.push(task1);
Page({
  data: {
      //mock数据
      tasks:task
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})