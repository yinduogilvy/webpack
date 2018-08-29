# 使用说明文档

## EventClass.js 自定义事件 [查看文档](https://www.npmjs.com/package/yindu-event)

## Frame.js 序列帧类 [查看文档](https://www.npmjs.com/package/yindu-frame)

## Page.js 页面布局类 [查看文档](https://www.npmjs.com/package/yindu-page)

## ResLoader.js 资源加载类 [查看文档](https://www.npmjs.com/package/yindu-resloader)

## PageResLoader.js HTML页面资源加载类 继承 ResLoader  [查看文档](https://www.npmjs.com/package/yindu-pageresloader)

## WXShare.js 微信分享 [查看文档](https://www.npmjs.com/package/yindu-wxshare)

## UploadFile.js 本地图片上传类 [查看文档](https://www.npmjs.com/package/yindu-uploadfile)


## alloy_finger.js 多指触碰类  [查看文档](https://www.npmjs.com/package/alloyfinger)

```
var af = new AlloyFinger(element, {
        touchStart: function () { },
        touchMove: function () { },
        touchEnd:  function () { },
        touchCancel: function () { },
        multipointStart: function () { },
        multipointEnd: function () { },
        tap: function () { },
        doubleTap: function () { },
        longTap: function () { },
        singleTap: function () { },
        rotate: function (evt) {
            console.log(evt.angle);
        },
        pinch: function (evt) {
            console.log(evt.zoom);
        },
        pressMove: function (evt) {
            console.log(evt.deltaX);
            console.log(evt.deltaY);
        },
        swipe: function (evt) {
            console.log("swipe" + evt.direction);
        }
    });
```
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
