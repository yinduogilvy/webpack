const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    merge = require('webpack-merge'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    common = require('./webpack.base.js'),
    {NODE_ENV,templates,stats} = require('../config/pro.config.js');
if(!stats){
    return console.error("统计代码不能为空"),process.exit(0);
}
module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new UglifyJsPlugin(),
        ...templates.map(template=>{
            return  new HtmlWebpackPlugin(template)
        })
    ]
});
console.log(1);