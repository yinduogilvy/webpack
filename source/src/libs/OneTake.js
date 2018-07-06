import EventClass from "./EventClass.js";

export default class OneTake extends EventClass{
    constructor({
        canvas=document.createElement("canvas"),
        width=750,
        height=1206,
        imgList = [],
        imgs =[],
        btnStart=document.body
    } = {}){
        super();
        this.canvas = canvas;
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.imgList = imgList; 
        this.imgs = imgs;
        this.index = 0;
        this.domElement = this.canvas;
        this.timer = null;
        this.fps = 60;
        this.radio = 1;
        this.scale = 0.99;
        this.willPause = false;
        this.btnStart = btnStart;
        this.scaleReturn = .8;
    }
    init({imgList = [],
        imgs =[]}){
        this.imgList = imgList || this.imgList; 
        this.imgs = imgs || this.imgs;
        this.btnStart.addEventListener("touchstart",this.handleTouchStart.bind(this),!1);
        this.btnStart.addEventListener("touchend",this.handleTouchEnd.bind(this),!1);
        this.draw();
        this.trigger("onetake:initcomplete")
    }
    handleTouchStart(ev){
        let self = this,
        oldTime = (new Date).getTime();
        ev.stopPropagation(),ev.preventDefault();
        function animate(){
            let now = (new Date).getTime();
            if(self.index+1 != self.imgList.length){
                if(now-oldTime < 1000/self.fps) {
                    return void( self.timer = requestAnimationFrame(animate));
                }
                oldTime = now;
                self.timer = requestAnimationFrame(animate);
                self.radio = self.radio * self.scale;
                self.draw();
            }
           
        }
        
        cancelAnimationFrame(this.timer);
        this.timer = requestAnimationFrame(animate);
        this.willPause = false;
        this.trigger("onetake:touchstart");
        return false;
    }
    handleTouchEnd(ev){
        if(this.imgList[this.index+1] && this.imgList[this.index+1].gif){
            this.willPause = true;
            this.trigger("onetake:gif_start");
            this.trigger("onetake:touchend");
        } else {
            this.willPause = false;
            cancelAnimationFrame(this.timer);
            this.trigger("onetake:touchend");
        } 
        
    }
    draw(){
        if(this.index+1 != this.imgList.length){
            if(this.radio < this.imgList[this.index+1].areaW / this.imgList[this.index+1].imgW){
                if(this.willPause){
                    this.radio = this.imgList[this.index+1].areaW / this.imgList[this.index+1].imgW;
                    cancelAnimationFrame(this.timer);
                    this.trigger("onetake:gif_end");
                }else if(this.index++,this.radio = 1,!this.imgList[this.index+1]){
                    return void(this.trigger("onetake:end"));
                }
            }
            this.imgNext = this.imgList[this.index+1];
            this.imgCur = this.imgList[this.index];
            this.img_oversize = this.imgNext.link;
            this.img_minisize = this.imgCur.link;
           
            this.drawImgOversize(
                this.img_oversize,
                this.imgNext.imgW,
                this.imgNext.imgH,
                this.imgNext.areaW,
                this.imgNext.areaH,
                this.imgNext.areaL,
                this.imgNext.areaT,
                this.radio
            );
            this.drawImgMinisize(
                this.img_minisize,
                this.imgCur.imgW,
                this.imgCur.imgH,
                this.imgNext.imgW,
                this.imgNext.imgH,
                this.imgNext.areaW,
                this.imgNext.areaH,
                this.imgNext.areaL,
                this.imgNext.areaT,
                this.radio
                
            );
        }
    }
    drawImgOversize(img,imgW,imgH,areaW,areaH,areaL,areaT,radio){
        let s_w = areaW / radio,
        s_h = areaH /radio,
        s_x = areaL - (s_w-areaW) * (areaL/(imgW-areaW)),
        s_y = areaT - (s_h-areaH)* (areaT/(imgH-areaH)),

        d_x = 0,
        d_y = 0,
        d_w = this.width,
        d_h = this.height;
        this.ctx.drawImage(img,s_x,s_y,s_w,s_h,d_x,d_y,d_w,d_h);
    }
    drawImgMinisize(img,cur_imgW,cur_imgH,imgW,imgH,areaW,areaH,areaL,areaT,radio){
        
        let s_x = 0,
        s_y = 0,
        s_w = cur_imgW,
        s_h = cur_imgH,
        d_x = (areaW/radio-areaW)*(areaL/(imgW-areaW))*radio*this.width/areaW,
        d_y = (areaH/radio-areaH)*(areaT/(imgH-areaH))*radio*this.height/areaH,
        d_w = this.width * radio,
        d_h = this.height * radio;
        this.ctx.drawImage(img,s_x,s_y,s_w,s_h,d_x,d_y,d_w,d_h);
    }

    returnback(){
        let oldTime = (new Date).getTime();
        let self = this;
        function animate(){
            let now = (new Date).getTime();
            if(self.index==-1){
                self.index = 0;
                self.trigger("onetake:backcomplete");
                self.radio = 1;
                return ;
            }else {
                if(now-oldTime < 1000/self.fps){
                    return void(self.timer = requestAnimationFrame(animate));
                }else{
                    oldTime = now;
                    self.radio = 1/self.scaleReturn * self.radio;
                    self.timer = requestAnimationFrame(animate);
                    self.drawReturn();

                    return void(0);
                }
            }
        }

        this.trigger("onetake:backstart");
        
        return cancelAnimationFrame(this.timer),this.timer = requestAnimationFrame(animate),void(0);
    }
    drawReturn(){
        if(this.radio>1){
            this.index--;
            this.radio = this.imgList[this.index+1].areaW /this.imgList[this.index].imgW;
           
        }

        if(this.index==-1){
            this.index = 0 ;
            this.trigger("onetake:backcomplete");
            return void(cancelAnimationFrame(this.timer));
        } else {
            this.imgNext = this.imgList[this.index+1];
            this.imgCur = this.imgList[this.index];
            this.img_oversize = this.imgNext.link;
            this.img_minisize = this.imgCur.link;
            this.drawImgOversize(
                this.img_oversize,
                this.imgNext.imgW,
                this.imgNext.imgH,
                this.imgNext.areaW,
                this.imgNext.areaH,
                this.imgNext.areaL,
                this.imgNext.areaT,
                this.radio
            );
            this.drawImgMinisize(
                this.img_minisize,
                this.imgCur.imgW,
                this.imgCur.imgH,
                this.imgNext.imgW,
                this.imgNext.imgH,
                this.imgNext.areaW,
                this.imgNext.areaH,
                this.imgNext.areaL,
                this.imgNext.areaT,
                this.radio
                
            );
        }
    }
}

