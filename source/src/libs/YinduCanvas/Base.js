import EventClass from "../EventClass.js";

export class Base extends EventClass {
    constructor(){
        super();
        // 坐标
        this.$x = 0;
        this.$y = 0;

        //宽高
        this.$width = 0;
        this.$height = 0;

        //缩放
        this.$scaleX = 1;
        this.$scaleY = 1;

        //是否可点击
        this.$touchabled = false;


        this.$parent

    }

    set x(value){
        if(this.$x !=value) this.$x = value;
    }
    get x(){
        return this.$x;
    }

    set y(value){
        if(this.$y !=value) this.$y = value;
    }
    get y(){
        return this.$y;
    }

    set width(value){
        if(this.$width !=value) this.$width = value;
    }
    get width(){
        return this.$width;
    }

    set height(value){
        if(this.$height !=value) this.$height = value;
    }
    get height(){
        return this.$height;
    }

    set scaleX(value){
        if(this.$scaleX !=value) this.$scaleX = value;
    }
    get scaleX(){
        return this.$scaleX;
    }


    set scaleY(value){
        if(this.$scaleY !=value) this.$scaleY = value;
    }
    get scaleY(){
        return this.$scaleY;
    }


    set touchabled(value){
        if(this.$touchabled !=value) this.$touchabled = value;
    }
    get touchabled(){
        return this.$touchabled;
    }
}

