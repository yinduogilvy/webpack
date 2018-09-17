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


