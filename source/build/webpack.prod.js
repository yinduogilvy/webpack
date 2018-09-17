const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    merge = require('webpack-merge'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    common = require('./webpack.base.js'),
    config= require('../config/pro.config.js'),
    {NODE_ENV,templates,stats} = config;
    
if(!stats){
    return console.error("统计代码不能为空"),process.exit(0);
}
module.exports = test = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new UglifyJsPlugin(),
        ...templates.map(template=>{
            return  new HtmlWebpackPlugin(merge(template,config))
        })
    ]
});