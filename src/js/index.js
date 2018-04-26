
import css from "../css/mode.scss";

import WXShare from "../libs/WXShare.js";
import PageResLoader from "../libs/PageResLoader.js";
import Page from "../libs/Page.js";


new PageResLoader().on("pageRes:loadComplete",function(e){
    $("body").addClass("loaded");
});
new Page();
new WXShare();



