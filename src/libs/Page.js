import assign from "babel-runtime/core-js/object/assign";
import {noop,eventDomain} from "./Util.js";


let defaultConfig = {
    pages: $('.page'),              //必需，需要切换的所有屏
    direction: 'vertical',          //可选，vertical 或 v 为上下滑动，horizontal 或 h 为左右滑动，默认为 vertical
    currentClass: 'current',        //可选，当前屏的class (方便实现内容的进场动画)，默认值为 'current'
    rememberLastVisited: true,      //可选，记住上一次访问结束后的索引值，可用于实现页面返回后是否回到上次访问的页面
    animationPlayOnce: false,       //可选，切换页面时，动画只执行一次
    oninit: noop,                   //可选，初始化完成时的回调
    onbeforechange:noop,            //可选，开始切换前的回调
    onchange: noop,                 //可选，每一屏切换完成时的回调
    onSwipeUp: noop,                //可选，swipeUp 回调
    onSwipeDown: noop,              //可选，swipeDown 回调
    onSwipeLeft: noop,              //可选，swipeLeft 回调
    onSwipeRight:noop               //可选，swipeRight 回调
};

export default  class Page {
    constructor(config = {}){
        config = assign(defaultConfig,config);
        this.pageSlider = new WxMoment.PageSlider(config);
    }
    next(){
        let {pageSlider} = this;
        $(pageSlider.pages[pageSlider.index]).data("lock-next",false);
        pageSlider.next();
    }
    prev(){
        let {pageSlider} = this;
        $(pageSlider.pages[pageSlider.index]).data("lock-prev",false);
        pageSlider.prev();
    }
    moveTo(page,isEase){
        this.pageSlider.moveTo(page,!!isEase);
    }
}