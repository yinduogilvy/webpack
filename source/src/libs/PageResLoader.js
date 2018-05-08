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
        let res = $("[data-src]"),self = this;
        res.each(function(){
            self.addImage($(this).data("src"),(url)=>{
                $(this).data("src",url);
            });
        });
        this.on("res:loadProgress",(e)=>{
            this.trigger("pageRes:loadProgress",...e);
        });
        this.on("res:loadComplete",(e)=>{
            res.each(function(){
                var url = $(this).data("src"),tagName = $(this).get(0).tagName.toLowerCase();
                if(tagName=="img"){
                    $(this).attr('src',url);
                }else{
                    $(this).css({"background-image":"url("+url+")"});
                }
            });
            this.trigger("pageRes:loadComplete",...e);
        });
        this.start();
        
        
        
     }
     
     
 }