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

| 事件                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| frame:playing      | 序列帧开始播放    |  | |
| frame:pause          | 序列帧暂停播放          | | |
| frame:stop            | 序列帧停止播放          | | | 



## Page.js 序列帧类


| 属性                 | 名称                  |   默认值    |              是否必须  |
| ---------            |:---------------       |:-------------|:-------------|    
| pages                 | 需要切换的所有屏                 |  $('.page')           | 否 |
| direction             | 切换方向 :vertical 或 v 为上下滑动，horizontal 或 h 为左右滑动           | vertical;          | 否 | 
| currentClass             | 当前屏的class (方便实现内容的进场动画)            | current          | 否 | 
| rememberLastVisited             | 记住上一次访问结束后的索引值，可用于实现页面返回后是否回到上次访问的页面            | true          | 否 | 
| animationPlayOnce             | 切换页面时，动画只执行一次            | function(){}          | 是否 | 
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

| 事件                 | 名称                  |   参数      |              示例  |
| ---------            |:---------------       |:-------------|:-------------|      
| frame:playing      | 序列帧开始播放    |  | |
| frame:pause          | 序列帧暂停播放          | | |
| frame:stop            | 序列帧停止播放          | | | 




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

