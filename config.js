const path = require('path');
//百度统计
const statsArr = {
    'zh': '26984424300688c49d02f5eed4031a61',
    'migugame': '6cca1164ad57902944130e5193cec5cc',
    'brookstone': 'c69e413e8efd2eb964460c9b5ac9b5ac',
    'zjyd': 'd703449a63eadad220b77508bbd3b2f6',
    'shyd': 'dddbc84f8b0595d74e1a148e6d189749'
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
        stats: statsArr.migugame,
        cdnURL: "",
        apiURL: "api.php",
        wxConfig: "/cache/wx_config.php",
        version: ""
    },
    //生产环境
    prod: {
        stats: statsArr.migugame, //统计代码
        cdnURL: "", //cdn url
        apiURL: "api.php",
        wxConfig: "/cache/wx_config.php", //wx_config.php
        version: "", //版本号
    }
};