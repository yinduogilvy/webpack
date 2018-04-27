import EventClass from "./EventClass.js";
const EXIF = require("./exif.js");
export default  class UploadFile extends EventClass{
  constructor({uploadId="uploadFile",compass=true,maxWidth=500,quality=0.92,callback=function(){}}={}){
    super();
    this.uploadId = uploadId;
    this.callback = callback;
    this.compass = compass;
    this.maxWidth = maxWidth ; 
    this.quality = quality;
    this.init();
  }
  init(){
    var self = this;
    this.events = {};
    //判断元素
    // if(this.selector && document.querySelector(this.selector)){
    //   this.el = document.querySelector(this.selector);
    // }else {
    //   this.el = document.createElement("div");
    // }
    // this.el.classList.add("upload-box");
    
    this.oInput = document.createElement("input");
    this.oInput.setAttribute("type","file");
    this.oInput.setAttribute("name",this.uploadId);
    this.oInput.setAttribute("id",this.uploadId);
    this.oInput.setAttribute("accept","image/*");
    this.oInput.style.position ="absolute";
    this.oInput.style.width ="100%";
    this.oInput.style.height ="100%";
    this.oInput.style.top = 0;
    this.oInput.style.left = 0;
    this.oInput.style.opacity = 0;
    this.oInput.style.display = "none";
    document.body.appendChild(this.oInput);
    //this.el.appendChild(this.oInput);



    this.reader = new FileReader();
    this.reader.addEventListener("loadstart",this.onLoadStart.bind(this),false);
    this.reader.addEventListener("progress",this.onProgress.bind(this),false);
    this.reader.addEventListener("abort",this.onAbort.bind(this),false);
    this.reader.addEventListener("load",this.onFinish.bind(this),false);
    this.reader.addEventListener("loadend",this.onLoadEnd.bind(this),false);
    this.reader.addEventListener("error",this.onError.bind(this),false);

    this.oInput.addEventListener("change",function(){
      self.readAsDataURL(this.files[0]);
    },false);


  }
  readAsDataURL(_file){
    this.handleFile(_file);
    this.reader.readAsDataURL(_file);
  }
  readAsArrayBuffer(_file){
    this.handleFile(_file);
    this.reader.readAsArrayBuffer(_file);
  }
  readAsBinaryString(_file){
    this.handleFile(_file);
    this.reader.readAsBinaryString(_file);
  }
  readAsText(_file){
    this.handleFile(_file);
    this.reader.readAsText(_file);
  }
  handleFile(_file){
    this.file = {
      name:_file.name,
      size:_file.size,
      type:_file.type,
      file:_file
    }
  }
  //文件开始上传
  onLoadStart(){
    this.trigger("loadstart");
  }
  /*文件上传进度*/
  onProgress(){
    this.trigger("loadprogress",{loaded:arguments[0].loaded,total:arguments[0].total});
  }
  //文件上传完成
  onFinish(){

  	var self = this;
  	var arg = arguments;
  	//对图片进行旋转

	if(EXIF){
	 EXIF.getData(self.file.file, function() {
	    //EXIF.getAllTags(this);
	   	let Orientation = EXIF.getTag(this, 'Orientation');
	    let canvas = document.createElement("canvas");
	    let ctx = canvas.getContext("2d");
	    let width = 0;
	    let height = 0;
	    let img = new Image();
	    img.onload = function(){
	    	var deg = 0;
	    	switch(Orientation){
	    		case 3: //旋转180度
	    			deg = 180;
	    			width = img.width;
	    			height = img.height;
	    			canvas.width = width;
			    	canvas.height = height;
			    	ctx.translate(width/2,height/2);
			    	ctx.rotate(deg*Math.PI/180);
			    	ctx.drawImage(this,-width/2,-height/2);
	    			break;
    			case 6: //顺时针旋转
    				deg = 90;
    				width = img.height;
    				height = img.width;
    				canvas.width = width;
			    	canvas.height = height;
			    	ctx.translate(width/2,height/2);
			    	ctx.rotate(deg*Math.PI/180);
			    	ctx.drawImage(this,-height/2,-width/2);
    				break;
				case 8://逆时针旋转
					deg = -90;
    				width = img.height;
    				height = img.width;
    				canvas.width = width;
			    	canvas.height = height;
			    	ctx.translate(width/2,height/2);
			    	ctx.rotate(deg*Math.PI/180);
			    	ctx.drawImage(this,-height/2,-width/2);
					break;
				default:

					width = img.width;
					height = img.height;
					canvas.width = width;
			    	canvas.height = height;
					ctx.drawImage(this,0,0);
					break;
	    	}


	    	var url = canvas.toDataURL();
	    	if(self.compass){
  			  self.onCompass(url);
  			}else {
          self.trigger("loadfinish",{result:url});
        }
    		

	    }
	    img.src = arg[0].target.result;
	  });
	}else {
	  if(self.compass){
	  	this.onCompass(arg[0].target.result);
	  }else {
      this.trigger("loadfinish",{result:arg[0].target.result});
    }
      
	}

  }
  //文件上传取消
  onAbort(){
    this.trigger("loadabort");
  }
  //文件上传失败
  onError(){
    this.trigger("loaderror");
  }
  //文件无论是否上传完成都会调用
  onLoadEnd(){
    this.trigger("loadend");
  }
  //压缩图片
  onCompass(url){
    let self = this;
    let tmp = document.createElement("canvas");
    let ctx = tmp.getContext("2d");
    let img = new Image();
    img.onload =function(){
      let per = img.height/img.width ;
  	  tmp.width = img.width > self.maxWidth ? self.maxWidth : img.width;
      tmp.height = tmp.width*per;
      ctx.drawImage(this,0,0,img.width,img.height,0,0,tmp.width,tmp.height);
      self.trigger("loadfinish",{result:tmp.toDataURL(self.file.type,self.quality)});
    }
    img.src = url;

  }
}
