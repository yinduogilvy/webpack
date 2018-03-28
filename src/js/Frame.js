
import EventClass from "./EventClass.js";
import assign from "babel-runtime/core-js/object/assign";
import {isString,isArray,isFunction,isObject} from "./Util.js";


(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());




/**
 * 
 * @function: 实现序列帧播放
 * @config : 配置文件
 *    
 *  
 * 
 */

const STOPPED = 1,PAUSED = 2,PLAYING = 3;
export default class Frame extends EventClass{

    constructor(config){
        super();
        assign(this,{
            rate:60, //帧速率 60 帧/秒,   
            wrapper:null
        },config);
        if(!this.wrapper){
            throw new Error('wrapper must be needed!');
        }
        //判断是否是字符串
        if(isString(this.wrapper)){
            this.wrapper = document.querySelector(this.wrapper);
        }else if(this.wrapper.nodeType==1){
            this.wrapper=this.wrapper;
        }
        this.wrapper = $(this.wrapper);
        this.children = this.wrapper.find("img");
        if($("#frame").css("position")=="static"){
            $("#frame").css({"position":"relative"});
        }
        this.children.css({
            position:'absolute',
            width:'100%',
            top:0,
            left:0
        });
        this.index = 0; //当前索引
        this.status = STOPPED;//当前状态
        this.timer = null ; //动画计时器
        this.total = this.children.length; //序列帧总数
        this.rate = 1000/this.rate; //帧速率
        this.lifeCyle = 0;//生命周期
        this.currTime = 0; //当前时间
        this.onAnimate = this.onAnimate.bind(this);
        this.children.eq(this.index).show().siblings().hide();
    }
    now(){
        return (Date.now && Date.now()) || +(new Date);
    }
    /**
     * @function:实现序列帧播放
     * @param:{current<Number>} 播放初始位置
     * @return: this 
     */

    play(_index){
        this.index = _index || this.index;
        if(this.status == STOPPED){
            this.onAnimate();
            !this.currTime && (this.currTime = this.now());
        }
        this.trigger("frame:play");
        this.status = PLAYING;
        return this;
    }
    /**
     * @function:播放序列帧
     * 
     */
    onAnimate(){
        this.lifeCyle += this.now()-this.currTime;
        this.currTime = this.now();
        if(this.status==PLAYING && this.lifeCyle>=this.rate){
            this.lifeCyle = 0;
            this.trigger("frame:playing");
            if(++this.index>this.total){
                this.stop();
                return this;
            }else {
                this.children.eq(this.index).show().siblings().hide();
            }
            
        }
        
        this.timer = requestAnimationFrame(this.onAnimate); 
    }
    /**
     * @function:暂停序列帧播放
     * @return:this
     */
    pause(){
        this.status = PAUSED;
        this.trigger("frame:pause");
        return this;
    }
    /**
     * @function:停止序列帧
     * @return : this
     */
    stop(){
        this.timer && cancelAnimationFrame(this.timer);
        this.timer = null;
        this.status = STOPPED;
        this.index = 0;
        this.currTime = 0;
        this.trigger("frame:stop");
        return this;
    }
}