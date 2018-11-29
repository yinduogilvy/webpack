const path = require("path"),
	src = path.resolve(__dirname,"../src");
function getIPAddress(){
	let interfaces = require("os").networkInterfaces();
	for(let devName in interfaces) {
		let inface = interfaces[devName];
		for(let i=0,len = inface.length;i<len;i++){
			let alias = inface[i];
			if(alias.family=="IPv4" && alias.address !="127.0.0.1" && !alias.internal){
                
				return alias.address;
			}
		}
	}
}


module.exports = {
	stats:"",//统计代码,
	cdnURL:"",//cdn ,
	wxConfig:"" ,//wxconfig,
	vconsole:true, // 控制台,
	version:"" ,// 版本号,
	NODE_ENV:"dev",
	localIP:getIPAddress(),
	proxy:{
		"/ajax.php":"http://192.168.5.89/study/yindu-cli/template/webpack/"
	},
	templates:[
		{
			filename: "index.html",
			title: "开发环境",
			template: path.resolve(src, "index.html"),
			inject: "body",
			chunks: ["index"],
			hash: true
		}
	]
};