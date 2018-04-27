# 使用说明文档

## EventClass.js 自定义事件 

| 方法                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| trigger(event[,data])| 触发事件               | event:<String>事件名称 ; data:<any>数据传输 |  |
| on(eventName,fn)     | 监听事件       |  eventName:<String\|Object\|Array>事件名称;fn:回调函数 |object.on('eventName',fn)绑定某个事件;<br/> object.on({ "event1":fn1, "event2":fn2}) 绑定多个事件;<br/>object.on(["event1","event2","event3"....],fn) 多个事件绑定一个回调函数; |
| bind(eventName,fn)   | on的别名               |  参照on方法  | |
| once(eventName,fn)   | 事件只监听一次          |  参照on方法  | |
| one(eventName,fn)    | once的别名             |  参照on方法  |  |
| off([eventName][,fn])| 解绑事件              | eventName :<String>事件名称; fn:回调函数| object.off() 解绑所有事件;<br/>2.object.off(event)解绑某个事件;<br/>3.object.off(event,fn) 解绑指定的回调函数 |
| unbind(eventName,fn) | off的别名               |  参照off方法  | |


## Frame.js 序列帧类

| 属性                 | 名称                  |   默认值    |              是否必须  |
| ---------            |:---------------       |:-------------|:-------------|    
| rate                 | 帧速率                 |  60           | 否 |
|  wrapper             | 序列帧父级            | null          | 是 | 



| 方法                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| play([index])        | 从指定位置播放序列帧    | index:<Number>指定播放位置 | |
| pause()              | 暂停序列帧播放          | | |
| stop()               | 停止序列帧播放          | | | 

| 事件                 | 名称                  |   说明      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| frame:playing      | 序列帧开始播放    |  | |
| frame:pause          | 序列帧暂停播放          | | |
| frame:stop            | 序列帧停止播放          | | | 



## Page.js 页面布局类


| 属性                 | 名称                  |   默认值    |              是否必须  |
| ---------            |:---------------       |:-------------|:-------------|    
| pages                 | 需要切换的所有屏                 |  $('.page')           | 否 |
| direction             | 切换方向 :vertical 或 v 为上下滑动，horizontal 或 h 为左右滑动           | vertical;          | 否 | 
| currentClass             | 当前屏的class (方便实现内容的进场动画)            | current          | 否 | 
| rememberLastVisited             | 记住上一次访问结束后的索引值，可用于实现页面返回后是否回到上次访问的页面            | true          | 否 | 
| animationPlayOnce             | 切换页面时，动画只执行一次            | function(){}          | 否 | 
| oninit             | 初始化完成时的回调            | function(){}          | 否 | 
| onbeforechange             | 开始切换前的回调            | function(){}          | 否 | 
| onchange             | 每一屏切换完成时的回调            | function(){}          | 否 | 
| onSwipeUp             | swipeUp 回调            | function(){}          | 否 |
| onSwipeDown             | swipeDown 回调            | function(){}          | 否 |
| onSwipeLeft             | swipeLeft 回调            | function(){}          | 否 | 
| onSwipeRight             | swipeRight 回调            | function(){}          | 否 |



| 方法                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| next()        | 切换到下一屏    | index:<Number>指定播放位置 | |
| prev()              | 返回上一屏          | | |
| moveTo(index[,isEase])               | 跳到指定位置          | index:跳到指定位置:<br/>isEase：是否需耀动画 默认:false需要动画 不需要动画:true | | 


## ResLoader.js 资源加载类


| 属性                 | 名称                  |   默认值    |              是否必须  |
| ---------            |:---------------       |:-------------|:-------------|    
| cdn                 |  cdn地址                 |  ""      | 否 |
| version             | 图片资源版本号           | ""          | 否 | 


| 方法                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| addImage(img[,callback])  | 添加图片   |  img:String 图片地址,会将图片名称以及后缀名处理形成键值 ，方便获取 <br/> callback:function : 将处理后的图片(与cdn和version结合)  |  bg.jpg 会转为 bg_jpg 以供 getImage使用|
| getImage(key)              | 获取图片          | 图片的键值 | 会返回img元素 |
| start()               | 开始 加载资源          |  | | 


| 事件                 | 名称                  |   说明      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| res:loadProgress     | 资源加载进度    | 参数:[{total:总资源,loaded:已经加载的资源}]  | |
| res:loadComplete          | 资源加载完成          | | |


## PageResLoader.js HTML页面资源加载类 继承 ResLoader

| 事件                 | 名称                  |   说明      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| pageRes:loadProgress     | 资源加载进度    | 参数:[{total:总资源,loaded:已经加载的资源}]  | |
| pageRes:loadComplete          | 资源加载完成          | | |


## WXShare.js 微信分享

| 属性                 | 名称                  |   默认值    |              是否必须  |
| ---------            |:---------------       |:-------------|:-------------|    
| shareAppTitle                 |  分享到朋友标题                 |  ""      | 是 |
| shareAppDesc             | 分享到朋友摘要           | ""          | 是 | 
| shareTimelineTitle             | 分享到朋友圈标题           | 取shareAppTitle值         | 否 | 
| shareTimelineDesc             | 分享到朋友圈摘要           | shareAppDesc          | 否 | 
| shareAppComplete             | 分享到朋友回调函数           | ""          | 否 | 
| shareTimelineComplete             | 分享到朋友圈回调函数           | ""          | 否 | 
| shareLink             | 分享链接           | 当前地址          | 否 | 
| cdn             | cdn            | ""          | 否 | 
| version             | 版本号           | ""          | 否 | 
| shareImage             | 分享图片           | ""          | 否 | 


| 事件                 | 名称                  |   说明      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| shareSuccess   | 分享成功    | 参数:[,{type:分享类型}}]   | {type:"app"}:分享朋友<br/>{type:"timeline"}:分享朋友圈 |




# 用于其他信息说明


## 统计代码

| 名称          | CDN         |统计      | 
| ---------       |:--------------- |:-------------|
| 北京移动 | bj.yindudigital.cn | 93690926399c3c2010ef1598305646ff|
| 安徽移动 | ahyd.yindudigital.cn | 197b7932aa54edd074c9b169edea9fc|
| 上海移动 | shyd.yindudigital.cn | 84ce82884295b4197f23a770b1c1c89c|
| 中航 | zh.yindudigital.cn   |  26984424300688c49d02f5eed4031a61|
| 江苏移动 | jsyd.yindudigital.cn| 05ee5754fe6a161e5576ba19582322df|
| 中移动政企 | zq.yindudigital.cn | 239cdedf188ab632c9b176946ccad7fb|
| 电信 | dx.yindudigital.cn  |  fea81dc154ca9556f519c5dc6c1d771c|
| 咪咕 | migu.yindudigital.cn  |  6cca1164ad57902944130e5193cec5cc|
| 宏图brookstone | brookstone.yindudigital.cn | c69e413e8efd2eb964460c9b5ac9b5ac|
| 湖南移动 | hnyd.yindudigital.cn     | b027ab295592b33c732f8e16cdb7b092|
| 咪咕圈圈 | migudm.yindudigital.cn  | eac030d4614f12ab54ac69f216ee6528|
| 浙江移动 | zjyd.yindudigital.cn  | d703449a63eadad220b77508bbd3b2f6|
| 海澜之家|                      |    d56398baa36600d0b4ab251b16f42dbe|



## webpack配置文件
* webpack.base.js
* webpack.devepment.js
* webpack.product.js

## javascript
* babel-core
* babel-loader
* babel-preset-env

## css
* postcss
* postcss-scss
* sass-loader
* node-sass
* autoprefixer
* cssnano
* css-loader
* style-loader
* extract-text-webpack-plugin
* postcss-next]

## assets
* url-loader
* file-loader

## html
* html-webpack-plugin

