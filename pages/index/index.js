//index.js
//获取应用实例
var app = getApp()
var task = [];
var task1 = { "expired": true, "user": "someone", "starttime": "2017-08-01 20:00", "endtime":"2017-08-03 19:59"};
task.push(task1);
Page({
  data: {
      //mock数据
      tasks:task,
      task_all: "task-selected",
      task_ing: "",
      task_expired: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    if (app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })
    } else {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
        }
    }
  },
  //全部任务
  filterall: function(e){
      this.setData({
          task_all: "task-selected",
          task_ing: "",
          task_expired: ""
      });
  },
  //进行中任务
  filtering: function(e){
      this.setData({
          task_all: "",
          task_ing: "task-selected",
          task_expired: ""
      });
  },
  //过期任务
  filterexpired: function(e){
      this.setData({
          task_all: "",
          task_ing: "",
          task_expired: "task-selected"
      });
  }
})