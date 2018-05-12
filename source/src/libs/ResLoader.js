import Promise from "babel-runtime/core-js/promise";
import EventClass from "../libs/EventClass.js";
import {noop,cdn} from "./Util.js";
/**
 * 
 * 资源加载器
 */
export default class ResLoader extends EventClass{
    constructor({cdn="",version="",origin=""}={}){
        super(cdn,version);
        
        this.loaded = 0;
        this.regxCommon = /\.(jpeg|jpg|png|gif|webp)$/ig;
        this.regxBase64 = /data:image\/(jpeg|jpg|png|gif);base64,/ig;
        this.cdn = cdn; //CDN 加速
        this.version = version;//版本号
        this.origin=  origin ; //是否跨域请求

        this.resources = []; //需要加载资源组
        this.promises = []; // promise 请求
        this.resObject = {}; //处理后的URL 的集合
        this.imgObject = {};//请求成功后的图片集合

    }
    addImage(img,callback=noop){
        let {regxCommon,regxBase64,resources,cdn,version} = this,url = "",key = "";
        if(regxCommon.test(img)){
            regxCommon.lastIndex = 0;
            url = `${cdn}${img}${version?"?"+version:""}`;
            key = img.slice(img.lastIndexOf("/")+1).replace(".","_");
            this.resObject[key]  = url;
        }else if(regxBase64.test(img)){
            regxBase64.lastIndex = 0;
            url = img;
            this.resObject['base64'] = this.resObject['base64'] || [];
            this.resObject['base64'].push(url);
        }else {
            console.error(`It must be an Image : jpeg or jpg or png or gif or webp or base64`);
        }
        resources.push(url);
        callback(url);
        return this;
    }
    getImage(key){
       return  this.imgObject[key];
    }
    getUrl(key){
        return this.resObject[key];
    }
    getKey(url){
        let {regxCommon,regxBase64} = this;
        let path = "";
        if(url.indexOf("?")>=0){
            path = (url.split("?"))[0];
        }
        if(regxCommon.test(path)){
            regxCommon.lastIndex = 0;
            path = path.slice(path.lastIndexOf("/")+1).replace(".","_");
            return path;
        }else if(regxBase64.test(path)){
            regxBase64.lastIndex = 0;
            return "base64";
        }
        
    }
    start(){
        let {origin,loaded,resources,promises,trigger,regxCommon,regxBase64} = this,total = resources.length;
        let self = this;
        resources.forEach(res=>{
            let  key =  this.getKey(res);
            let promise = new Promise((reslove,reject)=>{
                let img = new Image;
                if(origin){
                    img.crossOrigin =  origin;
                }
                img.onload = img.onerror = function(){
                    if(key=="base64") {
                        self.imgObject[key] = self.imgObject[key] || (self.imgObject[key]=[]);
                        self.imgObject[key].push(this);
                    }else {
                        self.imgObject[key] = this;
                    }
                    loaded++;
                    self.trigger("res:loadProgress",{
                        loaded,
                        total
                    });
                    reslove();
                    
                }
                img.src = res;
                
            });
            promises.push(promise);
            
        });
        Promise.all(promises).then(data=>{
            self.trigger("res:loadComplete",{
                loaded,
                total
            });
        });
    }
    

}