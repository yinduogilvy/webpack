//监听文件变化
const chokidar = require("chokidar"),
fs = require('fs'),
path = require("path"),
url = path.resolve(__dirname,"../src"),
res = path.resolve(url,"img"),
resPath = path.resolve(url,'js','res.json'),
jsonString = fs.readFileSync(resPath).toString('utf8'),
json = (jsonString && JSON.parse(jsonString))|| {
  'resources':[]
},
{resources} = json;






var watcher = chokidar.watch(res,{
  ignored:/(^|[\/\\])\..|\.md/
});

watcher
.on("add",addFile) //新增
.on("change",changeFile) // 改变
.on("unlink",deleteFile);

function formatURL(url){
  const {base,ext} = path.parse(url);

  return {
    key:base.replace(/\./,"_"),
    name:base,
    type:/\.mp3$/.test(ext)?"audio":/\.mp4$/.test(ext)?"video":"image"
  };
}
function addFile(url){
  let {key,name,type} = formatURL(url);
  if(checkFile(key)<0){
    resources.push({
      name:key,
      url:`../img/${name}`,
      type
    });
    writeFile();
  }
}

function changeFile(){

}

function deleteFile(url){
  let {key,name} = formatURL(url),
  i = checkFile(key);
  i && (resources.splice(i,1),writeFile());

}

//检测文件是否存在

function checkFile(filename){
  for(let i=0,len=resources.length;i<len;i++){
    const res = resources[i];
    if(res.name==filename){
      return i;
    }
  }
  return -1;
}


function writeFile(){
  fs.writeFileSync(resPath,JSON.stringify(json,null,4));
  console.log('文件写入成功');
}
