
import css from "../css/mode.scss";
import UploadFile from "../libs/UploadFile.js";

import WXShare from "../libs/WXShare.js";
import PageResLoader from "../libs/PageResLoader.js";
import Page from "../libs/Page.js";
import {cdn,version} from "../libs/Util.js";
console.log(version)

new PageResLoader({
    cdn,
    version,
    origin:"" // 用于跨域设置
}).on("pageRes:loadComplete",function(e){
    $("body").addClass("loaded");
});




let p = new Page()


/*
new Page();
const wx = new WXShare({
    shareAppTitle:"唧唧复唧唧",
    shareAppDesc:"木兰当户织",
    shareTimelineTitle:"不闻机杼声",
    shareTimelineDesc:"惟闻女叹息",
    shareAppComplete:function(){
        console.log("分享APP 成功");
    },
    shareTimelineComplete:function(){
        console.log("分享 朋友圈 成功")
    }
});
wx.on("shareSuccess",function(data){
    let {type} = data[0];
    console.log(type);
});

$(document).on("click",function(){
    wx.updateShare({
        shareAppTitle:"我是更新后的APP",
        shareAppDesc:"我是更新后的摘要",
        shareTimelineTitle:"我是更新后的朋友圈",
        shareLink:"http://www.yindudigital.com/migu/test/index.html?zhanghai"
    });
});


*/

// let uf = new UploadFile({

// });
// uf.on("loadstart",function(){
//     console.log("图片开始上传")
// });
// uf.on("loadprogress",function(data){
//     console.log(data)
// });
// uf.on("loadfinish",function(data){
//     console.log("上传上传成功");
//     console.log(data);
// })