/**
 * 
 * 用于页面图片加载
 */

 import ResLoader from "./ResLoader.js";


 export default class PageResLoader extends ResLoader{
     constructor({cdn="",version="",origin=""}={}){
        super({cdn,version,origin});

        this.init();    
     }

     init(){
        // let res = $("[data-src]"),self = this;
        // res.each(function(){
        //     self.addImage($(this).data("src"),(url)=>{
        //         $(this).data("src",url);
        //     });
        // });
        // this.on("res:loadProgress",(e)=>{
        //     this.trigger("pageRes:loadProgress",...e);
        // });
        // this.on("res:loadComplete",(e)=>{
        //     res.each(function(){
        //         var url = $(this).data("src"),tagName = $(this).get(0).tagName.toLowerCase();
        //         if(tagName=="img"){
        //             $(this).attr('src',url);
        //         }else{
        //             $(this).css({"background-image":"url("+url+")"});
        //         }
        //     });
        //     this.trigger("pageRes:loadComplete",...e);
        // });
        // this.start();
        var loader = new WxMoment.Loader();
        this.res = $("[data-src]");

        if(!this.res.length) return this.loadComplete(),false;

        var self = this;
        this.res.each(function(){
            var url = self.cdn+$(this).data("src")+(self.version?"?v="+(self.version):"");
            $(this).data("src",url);
            loader.addImage(url);
        })


        loader.addProgressListener(this.loadProgress.bind(this));
        loader.addCompletionListener(this.loadComplete.bind(this));

        loader.start();
        
        
        
     }
     loadProgress(e){
        this.trigger("pageRes:loadProgress", {loaded:e.completedCount,total:e.totalCount});
     }
     loadComplete(){
        this.res.each(function(){
            var url = $(this).data("src"),tagName = $(this).get(0).tagName.toLowerCase();
            if(tagName=="img"){
            $(this).attr('src',url);
            }else{
            $(this).css({"background-image":"url("+url+")"});
            }
        });
        this.trigger("pageRes:loadComplete");
     }
     
     
 }