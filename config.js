const path = require('path');
//百度统计
/**
 * 
 * CDN                                                     百度统计
 * bj.yindudigital.cn              北京移动                93690926399c3c2010ef1598305646ff
 * ahyd.yindudigital.cn            安徽移动                197b7932aa54edd074c9b169edea9fc
 * shyd.yindudigital.cn            上海移动                84ce82884295b4197f23a770b1c1c89c
 * zh.yindudigital.cn              中航                    26984424300688c49d02f5eed4031a61
 * jsyd.yindudigital.cn            江苏移动                 05ee5754fe6a161e5576ba19582322df
 * zq.yindudigital.cn              中移动政企               239cdedf188ab632c9b176946ccad7fb
 * dx.yindudigital.cn              电信                    fea81dc154ca9556f519c5dc6c1d771c
 * migu.yindudigital.cn            咪咕                    6cca1164ad57902944130e5193cec5cc
 * brookstone.yindudigital.cn      宏图brookstone          c69e413e8efd2eb964460c9b5ac9b5ac
 * hnyd.yindudigital.cn            湖南移动                 b027ab295592b33c732f8e16cdb7b092
 * migudm.yindudigital.cn          咪咕圈圈                 eac030d4614f12ab54ac69f216ee6528
 * zjyd.yindudigital.cn            浙江移动                 d703449a63eadad220b77508bbd3b2f6
                                   海澜之家                 d56398baa36600d0b4ab251b16f42dbe
 * 
 */

const statsArr = {
    'bj':'93690926399c3c2010ef1598305646ff', //北京移动
    'ahyd':'197b7932aa54edd074c9b169edea9fc',//安徽移动
    'shyd':'84ce82884295b4197f23a770b1c1c89c',//上海移动
    'zh': '26984424300688c49d02f5eed4031a61',//中航
    'jsyd':'05ee5754fe6a161e5576ba19582322df',//江苏移动
    'zq':'239cdedf188ab632c9b176946ccad7fb',//中移动政企 
    'dx':'fea81dc154ca9556f519c5dc6c1d771c',//电信
    'migu':' 6cca1164ad57902944130e5193cec5cc',//咪咕
    'migudm': 'eac030d4614f12ab54ac69f216ee6528',//咪咕圈圈
    'brookstone': 'c69e413e8efd2eb964460c9b5ac9b5ac', //宏图三胞
    'hnyd':'b027ab295592b33c732f8e16cdb7b092',//湖南移动
    'zjyd': 'd703449a63eadad220b77508bbd3b2f6',//浙江移动
    'hailan':'d56398baa36600d0b4ab251b16f42dbe'//海澜之家
};
module.exports = {
    //开发环境
    dev: {
        stats: "", //统计代码
        cdnURL: "", //cdn url
        apiURL: "", //api url
        wxConfig: "", //wx_config.php
        version: "", //版本号
        vconsole: true
    },
    //测试环境
    testing: {
        stats: "",
        cdnURL: "",
        apiURL: "api.php",
        wxConfig: "/cache/wx_config.php",
        version: ""
    },
    //生产环境
    prod: {
        stats: "", //统计代码
        cdnURL: "", //cdn url
        apiURL: "api.php",
        wxConfig: "/cache/wx_config.php", //wx_config.php
        version: "", //版本号
    }
};