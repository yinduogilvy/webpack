import EventClass from "../libs/EventClass.js";
import {isArray} from "../libs/Util.js";
import Promise from "babel-runtime/core-js/promise";


/**
 * 基类库
 **/

export class YinduCanvas extends EventClass {
    constructor(width,height){
        super();
        width && (this.$width =width);
        height && (this.$height = height);
        this.makePriavteProperty();
        this.on("canvas:clear",this.clear.bind(this));
        this.on("canvas:draw",this.draw.bind(this));
        
    }
    //创建私有属性
    makePriavteProperty(){
        this.$name = "";
        this.$width = this.$width || 0;
        this.$height = this.$height || 0;
        this.$parent = null;
        this.$x = 0;
        this.$y = 0;
        this.$children = [];
        this.el = this.$canvas = document.createElement("canvas");
        this.$ctx = this.$canvas.getContext("2d");
        this.$canvas.width = this.$width;
        this.$canvas.height = this.$height;
        this.$fillStyleColor = "";
        
        /*新增 */
        this.$anchorOffsetX = 0;
        this.$anchorOffsetY = 0;
        this.$scaleX = 1;
        this.$scaleY = 1;
        this.$rotation  = 0;
        this.$mask = null;

    }

    set fillColor(value){
        if(this.$fillStyleColor != value){
            this.$fillStyleColor = value;
        }
    }
    get fillColor(){
        return this.$fillStyleColor;
    }
    //父级  只读
    get parent(){
        return this.$parent;
    }

    //设置名称
    set name(value){
        if(this.$name!==value){
            this.$name = value;
        }
    }
    get name(){
        return this.$name;
    }

    //设置宽度
    set width(value){
        if(this.$width!==value){
            this.$width = value;
            this.$canvas.width = this.$width;
            
        }
    }
    get width(){
        return this.$width;
    }

    //设置高度
    set height(value){
        if(this.$height!==value){
            this.$height = value;
            this.$canvas.height = this.$height
        }
    }
    get height(){
        return this.$height;
    }
    //设置坐标:x
    set x(value){
        if(this.$x!==value){
            this.$x = value;
        }
    }
    get x(){
        return this.$x;
    }
    //设置坐标:y
    set y(value){
        if(this.$y!==value){
            this.$y = value;
        }
    }
    get y(){
        return this.$y;
    }
    set anchorOffsetX(val){
        this.$anchorOffsetX = val;
    }
    get anchorOffsetX(){
        return  this.$anchorOffsetX;
    }
    set anchorOffsetY(val){
        this.$anchorOffsetY = val;
    }
    get anchorOffsetY(){
        return  this.$anchorOffsetX;
    }
    
    set scaleX(val){
        this.$scaleX = val;
    }
    get scaleX(){
        return  this.$scaleX;
    }

    set scaleY(val){
        this.$scaleY = val;
    }
    get scaleY(){
        return  this.$scaleY;
    }


    set rotation(val){
        this.$rotation = val;
    }
    get rotation(){
        return  this.$rotation;
    }

    set mask(value) {
        if(this.mask!=value){
            this.$mask = value;
        }
        
    }




    //获取 元素
    get children(){
        return this.$children;
    }

    //添加子元素
    addChild(child){
        child.$parent = this;
        this.$children.push(child);
    }
    removeChild(child){
        child.$parent = null;
        let index = this.$children.indexOf(child)
        this.$children.splice(index,1);
    }
    removeAll(){
        for(let child of this.$children){
            this.removeChild(child);
        }
        
    }
    remove(){
        this.$parent && this.$parent.removeChild(this);
    }
    clear(){
        this.$ctx.clearRect(0,0,this.$width,this.$height);
        //console.log(this.name+"清除");
    }
    //绘制
    draw(){
        this.clear();
        if(this.$fillStyleColor){
            this.$ctx.fillStyle = this.$fillStyleColor;
            this.$ctx.fillRect(0,0,this.$width,this.$height);
        }
        
        for(let child of this.$children){
            let {$canvas,$width,$height,$x,$y,$anchorOffsetX,$anchorOffsetY,$scaleX,$scaleY,$rotation} = child;
            this.$ctx.save();
            this.$ctx.translate($x,$y);
            this.$ctx.rotate(Math.PI*$rotation/180);
            this.$ctx.scale($scaleX,$scaleY);
            child.draw();
            this.$ctx.drawImage($canvas,-1 * $anchorOffsetX,-1 * $anchorOffsetY,$width,$height);
            this.$ctx.restore();
        }

        
    }
    toDataURL(type="image/png",quality=0.92){
        return this.$canvas.toDataURL(type,quality);
    }
}
//位图
export class Bitmap extends YinduCanvas {
    constructor(width,height){
        super(width,height);
    }
    makePriavteProperty(){
        super.makePriavteProperty();
        this.$texture = null;
    }
    set texture(value){
        if(this.$texture!=value){
            this.$texture = value;
            this.width = this.width || value.width;
            this.height = this.height || value.height;
        }
    }
    get texture(){
        return this.$texture;
    }
    draw(){
        super.draw();
        this.$ctx.drawImage(this.$texture,0,0,this.$width,this.$height);
        if(this.$mask){
            let $mask = this.$mask,$ctx = this.$ctx;
            $mask.draw();
            $ctx.save();
            $ctx.globalCompositeOperation = "destination-in";
            $ctx.drawImage($mask.$canvas,$mask.x,$mask.y,$mask.width,$mask.height);
            $ctx.restore();

        }
    }
}


/* 矢量图 */
export class Sprite extends YinduCanvas {
    constructor(width,height){
        super(width,height);
    }
}

export class Circle extends YinduCanvas{
    constructor(r,startAngel = 0,deg=180,clockwise=false){
        super();
        this.$r = r;
        this.$deg = Math.PI *(deg+startAngel)/180;
        this.$startAngel = Math.PI * startAngel/180;
        this.$clockwise =  clockwise;
        this.$canvas.width = this.$canvas.height = this.$width = this.$height = 2*r;
        
    }
    draw(){
        this.clear();
        let {$ctx,$canvas,$r,$startAngel,$deg,$clockwise} = this;
        $ctx.fillStyle = this.$fillStyleColor;
        $ctx.beginPath();
        // $ctx.moveTo($r,$r);
        // $ctx.lineTo($r,$r+$r*Math.sin(this.$startAngel));
        // $ctx.lineTo($r+$r*Math.cos(this.$deg+this.$startAngel),$r);
        // $ctx.arc($r,$r,$r,$startAngel,$deg,$clockwise);
        $ctx.arc($r,$r,$r,$startAngel,$deg,$clockwise)
        $ctx.closePath();
        $ctx.fill();
       
    }
}
// 圆角
export class RectRound extends YinduCanvas {
    constructor(width,height,round){
        super(width,height,round);
        this.$round = round;
    }
    handleDeg(deg){
        return Math.PI*deg/180;
    }
    draw(){
        this.clear();
        let {$canvas,$ctx,$width,$height,$round,$fillStyleColor,handleDeg} = this;
        $ctx.fillStyle = $fillStyleColor;
        $ctx.beginPath();
        $ctx.arc($round,$round,$round,handleDeg(90),handleDeg(270));
        $ctx.closePath();
        $ctx.fill();
        $ctx.fillRect($round,0,$width-2*$round,$height);
        $ctx.beginPath();
        $ctx.arc($width - $round,$round,$round,handleDeg(90),handleDeg(270),true);
        $ctx.closePath();
        $ctx.fill();
    }

    

}


//文字
export class Front extends YinduCanvas{
    constructor(width,height){
        super(width,height);
    }
    makePriavteProperty(){
        super.makePriavteProperty();
        this.$fontSize = 18;
        this.$fontColor = "#000";
        this.$fontText = "";
        this.$fontFamily = "黑体";
        this.$textAlign = "";
    }
    set fontSize(value){
        if(this.$fontSize != value){
            this.$fontSize = value;
        }
    }
    get fontSize(){
        return this.$fontSize;
    }

    set fontColor(value){
        if(this.$fontColor != value){
            this.$fontColor = value;
        }
    }
    get fontColor(){
        return this.$fontColor;
    }
    set fontText(value){
        if(this.$fontText != value){
            this.$fontText = value;
        }
    }
    get fontText(){
        return this.$fontText;
    }
    set fontFamily(value){
        if(this.$fontFamily != value){
            this.$fontFamily = value;
        }
    }
    get fontFamily(){
        return this.$fontFamily;
    }

    set textAlign(value){
        if(this.$textAlign!=value){
            this.$textAlign = value;
        }
    }


    draw(){
        let {$ctx,$canvas} = this,font =  `normal normal bold ${this.$fontSize}px  ${this.fontFamily}`;
        $ctx.font = font;
        let $fontWidth = $ctx.measureText(this.$fontText).width;
        $canvas.width = this.$width = this.$width || $fontWidth ;
        $canvas.height = this.$height = this.$height || this.$fontSize*2;
        this.clear();
        $ctx.fillStyle = this.$fontColor;
        $ctx.textBaseline = "top";
        $ctx.font = font;
        let $x = 0;
        if(this.$textAlign=="center") {
            $x = (this.$width - $fontWidth)/2;
        }else if(this.$textAlign=="left"){
            $x = 0;
        }else if(this.$textAlign=="right"){
            $x = (this.$width - $fontWidth);
        }
        $ctx.fillText(this.$fontText,$x,0);

        
    }
}
/**
 * 舞台
 **/
export class Stage extends YinduCanvas {
    constructor(width,height){
        super(width,height);
    }
}



