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

