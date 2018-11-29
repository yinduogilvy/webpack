
import "../css/mode.scss";

const {cdn,version, eventDomain} = require("yindu-util"),
	WXShare = require("yindu-wxshare"),
	PageResLoader = require("yindu-pageresloader"),
	Page = require("yindu-page");

new PageResLoader({
	cdn,
	version,
	origin:"" // 用于跨域设置
}).on("pageRes:loadComplete",function(){
	$("body").addClass("loaded");
});

new Page();
new WXShare({
	shareLink:eventDomain,
	shareAppTitle: "分享到朋友的标题",
	shareAppDesc: "分享到朋友的摘要",
	shareTimelineTitle:"分享到朋友圈的标题, 可选 "
}); 




