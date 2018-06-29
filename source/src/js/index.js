
import css from "../css/mode.scss";
import UploadFile from "../libs/UploadFile.js";

import WXShare from "../libs/WXShare.js";
import PageResLoader from "../libs/PageResLoader.js";
import Page from "../libs/Page.js";
import {cdn,version} from "../libs/Util.js";


new PageResLoader({
    cdn,
    version,
    origin:"" // 用于跨域设置
}).on("pageRes:loadComplete",function(e){
    $("body").addClass("loaded");
});




let p = new Page()

