import Promise from "babel-runtime/core-js/promise";
import EventClass from "../libs/EventClass.js";
import {noop,getCdn} from "./Util.js";
/**
 * 
 * 资源加载器
 */
export default class ResLoader extends EventClass{
    constructor({cdn="",version=""}={}){
        super(cdn,version);
        this.resources = [];
        this.promises = [];
        this.loaded = 0;
        this.regxCommon = /\.(jpeg|jpg|png|gif|webp)$/ig;
        this.regxBase64 = /data:image\/(jpeg|jpg|png|gif);base64,/ig;
        this.cdn = cdn || getCdn();
        this.version = version;
        this.resObject = {};
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
       return  this.resObject[key];
    }
    start(){
        let {loaded,resources,promises,trigger,regxCommon,regxBase64} = this,total = resources.length;
        let self = this;
        //if(resources.length<1) return this.trigger("res:loadComplete"),false;
        resources.forEach(res=>{

            let promise = new Promise((reslove,reject)=>{
                let img = new Image;
                //img.crossOrigin =  "*";

                img.onload = img.onerror = function(){
                    
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