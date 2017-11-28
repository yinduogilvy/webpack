require("../css/mode.scss");

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

var noop = function(){};

var eventDomain = document.location.href.substr(0,document.location.href.lastIndexOf("/")+1);


/*
** @Class:页面布局
** @params:config:Object 页面配置
** @param:cdn:string  CDN加速地址
** @param:cache:boolean 清楚缓存
** @param:shareTitle:string 分享标题
** @param:shareDesc:string 分享摘要
*/
var Page = (function(){
  function Page(config){
    this.init(config);
  }
  Object.assign(Page.prototype,{
    /*
    ** @function:初始化配置
    ** @params: config:Object 配置文件
    */
    init:function(config){
      Object.assign(this,{
        cdn:$("base").attr("href") || "",
        cache:false,
        shareTitle:'',
        shareDesc:''
      },config);

      this.loadRes();
      this.initPage();
      this.initShareConfig();
    },

    /*
    ** @function:加载资源
    */
    loadRes:function(){
      var loader = new WxMoment.Loader();
      this.res = $("[data-src]");

      if(!this.res.length) return this.loadComplete(),false;

      var self = this;
      this.res.each(function(){
        var url = self.cdn+$(this).data("src")+(self.cache?"v="+(+new Date):"");
        $(this).data("src",url);
        loader.addImage(url);
      })


      loader.addProgressListener(this.loadProgress.bind(this));
      loader.addCompletionListener(this.loadComplete.bind(this));

      loader.start();
    },
    /*
    ** @function:资源加载进度
    ** @params: e:Object =>{ completedCount:number ,totalCount:number}
    ** @param:completedCount:number 已经加载数量
    ** @param:totalCount:number 全部资源数量
    */
    loadProgress:function(e){

    },
    /*
    ** @function:资源加载完成函数
    */
    loadComplete:function(){
      this.res.each(function(){
        var url = $(this).data("src"),tagName = $(this).get(0).tagName.toLowerCase();
        if(tagName=="img"){
          $(this).attr('src',url);
        }else{
          $(this).css({"background-image":"url("+url+")"});
        }
      });
      $("body").addClass("loaded");
    },

    /*
    ** @function:初始化页面
    */
    initPage:function(){
      this.pageSlider = new WxMoment.PageSlider({
        pages:$(".page")
      });
    },
    /*
    ** @function:下一页
    */
    next:function(){
      $(this.pageSlider.pages[this.pageSlider.index]).data("lock-next",false);
      this.pageSlider.next();
    },
    /*
    ** @function:上一页
    */
    prev:function(){
      $(this.pageSlider.pages[this.pageSlider.index]).data("lock-prev",false);
      this.pageSlider.prev();
    },
    /*
    ** @function:下一页
    ** @param:page:number 跳到指定页面
    ** @param:isEase:number default:false  直接跳到第 n 屏，有缓动效果
    */
    moveTo:function(page,isEase){
      this.pageSlider.moveTo(page,!!isEase);
    },
    /*
    ** @function:ajax数据请求
    ** @param:data:Object 数据请求对象
    ** @param:callback:Function 请求成功 回调函数
    ** @param:config:String 请求加载文案 默认值：数据加载中...
    */
    ajax:function(data,callback,text){
      var url = (this.cdn?eventDomain:"")+"ajax.php";
      var loading = weui && weui.loading(text||"数据加载中...");
      $.ajax({
        url:url,
        type:'post',
        data:data,
        dataType:'json',
        success:function(msg){
          loading.hide();
          (typeof callback=="function"? callback:noop)(msg);
        }
      })
    },
    /*
    ** @function:初始化分享配置
    */
    initShareConfig:function(){
      var self = this;
      window.wxdatas = {
        appid:'',
        img_url:(self.cdn? self.cdn:eventDomain)+'/img/share.jpg',
        img_width:'120',
        img_height:'120',
        link:eventDomain,
        title:self.shareTitle,
        desc:self.shareDesc,
        url:''
      }
    },
    /*
    ** @function:更新朋友圈分享
    ** @param:config:Object
    */
    updateShare:function(config){
      var opt  = Object.assgin(wxdatas,config);
      //分享到朋友圈
      wx.onMenuShareTimeline(opt);
      //分享给朋友
      wx.onMenuShareAppMessage(opt);
    },


  });
  return Page;
})();

new Page();
