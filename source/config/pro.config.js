const statsJson = require("./stats.json");
const devConfig = require("./dev.config.js");
const merge = require("webpack-merge");
module.exports  = merge({
	customizeArray(a,b,key){
		if(key==="templates"){
			return b;
		}
	}
})(devConfig,{
	stats:(statsJson["wanke"]).trim(),
	cdnURL:"",
	wxConfig:"http://www.yindudigital.cn/cache/wx_config.php" ,
	vconsole:false,
	version:"",
	NODE_ENV:"pro",
	proxy:null
});




