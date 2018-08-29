
import "../css/mode.scss";

const {cdn,version} = require("yindu-util"),
WXShare = require("yindu-wxshare"),
PageResLoader = require("yindu-pageresloader"),
Page = require("yindu-page");




new PageResLoader({
    cdn,
    version,
    origin:"" // 用于跨域设置
}).on("pageRes:loadComplete",function(e){
    $("body").addClass("loaded");
});

let p = new Page();




