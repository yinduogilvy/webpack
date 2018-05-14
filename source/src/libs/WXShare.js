import EventClass from "../libs/EventClass.js";
import assign from "babel-runtime/core-js/object/assign";
import {getHash,eventDomain,noop,cdn} from "./Util.js";
let g_cdn = cdn;
/**
 * 
 *  @description:微信分享类
 *  @param: 
 *      1. shareAppTitle:<String> 分享朋友标题
 *      2. shareAppDesc:<String> 分享朋友摘要
 *      3. shareTimelineTitle:<String> 分享朋友圈标题
 *      4. shareTimelineDesc:<String> 分享到朋友圈摘要 
 *      3. ShareAppComplete:<Function> 分享到朋友 成功回调函数
 *      4. shareTimelineComplete：<Function> 分享到朋友圈  成功回调函数
 */



export default class WXShare extends EventClass{
    constructor({version="",shareAppTitle="",shareLink="",shareAppDesc="",shareTimelineTitle="",shareTimelineDesc="",shareAppComplete=noop,shareTimelineComplete=noop,cdn=""}={}){
        super();
        this.shareAppTitle = shareAppTitle;
        this.shareAppDesc = shareAppDesc;
        this.shareTimelineTitle = shareTimelineTitle || shareAppTitle;
        this.shareTimelineDesc = shareAppDesc;
        this.shareAppComplete = shareAppComplete;
        this.shareTimelineComplete = shareTimelineComplete;
        this.eventDomain = shareLink || eventDomain ;
        this.shareImage = `${cdn?cdn:g_cdn}img/share.jpg${version?'?'+version:''}`;
        this.initShare();

    }
    
    initShare(){
        
        window.wxdatas = {
            title2:this.shareAppTitle, //分享到朋友
            title:this.shareTimelineTitle, //分享到朋友圈
            desc2:this.shareAppDesc, 
            desc1:this.shareTimelineDesc,
            link:this.eventDomain,
            img_url:this.shareImage,
            TimelineSuccess:()=>{
                this.shareTimelineComplete();
                this.trigger("shareSuccess",{type:'timeline'});
            },
            ShareAppMessageSuccess:()=>{
                console.log(this);
                this.shareAppComplete();
                this.trigger("shareSuccess",{type:'app'});
            }
        }
    }
    /**
     * 
     * 更新分享 
     */
    updateShare(config){
        console.log(config);
        wx.onMenuShareTimeline({
            title:config.shareTimelineTitle || config.shareAppTitle || this.shareTimelineTitle,
            link: config.shareLink || this.eventDomain,
            imgUrl:config.shareImage || this.shareImage,
            success:()=>{
                if(typeof config.shareTimelineComplete==undefined){
                    config.shareTimelineComplete();
                }else {
                    this.shareTimelineComplete();
                }
                this.trigger("shareSuccess",{type:'timeline'});
                
                
            }
        });

        wx.onMenuShareAppMessage({
            title:config.shareAppTitle || this.shareAppTitle,
            link: config.shareLink || this.eventDomain,
            desc:config.shareAppDesc || this.shareAppDesc,
            imgUrl:config.shareImage || this.shareImage,
            success:()=>{
                if(typeof config.shareShareAppComplete==undefined){
                    config.shareAppComplete();
                }else {
                    this.shareAppComplete();
                }
                this.trigger("shareSuccess",{type:'app'});
                
            }
        })
    }

    


}