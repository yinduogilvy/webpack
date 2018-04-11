import assign from "babel-runtime/core-js/object/assign";

import css from "../css/mode.scss";

process.env.NODE_ENV == 'prod' && (console.log = function() {});

//Config
const Config = BASE_CONFIG || {},
noop = function(){},
href = document.location.href,
eventDomain = href.substr(0,href.lastIndexOf("/")+1);
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
  assign(Page.prototype,{
    /*
    ** @function:初始化配置
    ** @params: config:Object 配置文件
    */
    init:function(config){
      //获取index.js的hash
      let hash = this.getHash();
      assign(this,{
        cdn:$("base").attr("href") || "",
        cache:true,
        shareTitle:'',
        shareDesc:'',
        debug:true,
        version:  hash || ''
      },config);
      if(this.debug){
        var otips = document.createElement("div");
        $(otips).css({
          position:"fixed",
          top:0,
          left:0,
          width:"100%",
          padding:"10px",
          lineHeight:1.5,
          backgroundColor:"rgba(0,0,0,0)",
          color:"rgba(255,0,0,.5)",
          fontSize:24,
          zIndex:9999
        }).text("此页面仅提供测试，上线前请联系程序！");
        $("body").append(otips);
      }
      this.loadRes();
      this.initShareConfig();
    },
    getHash: function(){
        let $script = $('script[src*="index"]');
        let hash = ($script.attr('src').split('?')).pop();
        return hash;
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
        var url = self.cdn+$(this).data("src")+(self.cache?"?v="+(self.version):"");
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

      this.initPage();
    },

    /*
    ** @function:初始化页面
    */
    initPage:function(){
      $("body").addClass("loaded");
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
        img_url:(self.cdn? self.cdn:eventDomain)+'img/share.jpg',
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
      var opt  = Object.assign({
        imgUrl:wxdatas.img_url
      },wxdatas,config);
      //分享到朋友圈
      wx.onMenuShareTimeline(opt);
      //分享给朋友
      wx.onMenuShareAppMessage(opt);
    },


  });
  return Page;
})();

new Page();
