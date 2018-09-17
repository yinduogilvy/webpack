const statsJson = require("./stats.json");
const devConfig = require("./dev.config.js");
const merge = require('webpack-merge');
const path = require("path"),
src = path.resolve(__dirname,"../src");
module.exports = test = merge({
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


