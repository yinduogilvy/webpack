

const webpack = require("webpack"),
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    common = require('./webpack.base.js'),
    config = require('../config/dev.config.js');

module.exports =  merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: '../',
        open: true,
        inline: true,
        host:config["localIP"],
        useLocalIp:false,
        proxy:config["proxy"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(config["NODE_ENV"])
        }),
        ...config["templates"].map(template=>{
            return  new HtmlWebpackPlugin(merge(template,config))
        })
        
    ]
});