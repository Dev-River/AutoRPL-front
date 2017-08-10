Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//接口返回
//暂时造数据
var app = getApp()
var objects = [];

Page({
    data: {
        modalHidden: true,
        startdate: new Date().format('yyyy-MM-dd'),
        enddate: new Date().format('yyyy-MM-dd'),
        warning: "结束时间不能早于开始时间！",
        loading: false,
        objpicker_display: 'none',
        disabled: false,
        objs: objects, 
        obj_s_display: "none",
        obj_s: {},
        keymap: [
            '一对一',
            '多对一',
            '随机多对多'
        ],
        tpltype: {
            isHidden: true,
            selected: ""
        }
    },
    bindStartDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        if (e.detail.value <= this.data.enddate) {
            if (e.detail.value < new Date().format('yyyy-MM-dd')){
                this.setData({
                    warning: "开始时间不能早于当前时间！",
                    modalHidden: false
                })
                return;
            }
            this.setData({
                startdate: e.detail.value
            });
        } else {
            this.setData({
                modalHidden: false
            })
        }
    },
    bindEndDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        if (e.detail.value >= this.data.startdate) {
            this.setData({
                enddate: e.detail.value
            });
        } else {
            this.setData({
                modalHidden: false
            })
        }
    },
    modalChange: function (e) {
        this.setData({
            modalHidden: true
        })
    },
    toWhom: function () {
        var replace;
        if (this.data.objpicker_display == 'block'){
            replace = 'none';
        } else {
            replace = 'block';
        }
        this.setData({
            objpicker_display: replace
        })
    },
    bindObjSelect: function (e) {
        this.setData({
            obj_s: this.data.objs[e.detail.value],
        })
    },
    onLoad: function () {
        console.log('onLoad');
        if (app.globalData.userInfo) {
            var obj = app.globalData.userInfo;
            for(var i = 0; i<10; i++){
                objects.push(obj);
            }
            this.setData({
                objs: objects
            });
        } else {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                for (var i = 0; i < 10; i++) {
                    objects.push(obj);
                }
                this.setData({
                    objs: objects
                }); 
            }
        }
    },
    bindTypeChange: function(e){
        this.setData({
            tpltype: {
                isHidden: false,
                selected: e.detail.value
            }
        });
    },
    addKeyMap: function(){},
    objComfirm: function(){
        this.setData({
            obj_s_display: "flex"
        });
    }
});