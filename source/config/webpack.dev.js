function getIPAddress(){
    let interfaces = require("os").networkInterfaces();
    for(let devName in interfaces) {
        let interface = interfaces[devName];
        for(let i=0,len = interface.length;i<len;i++){
            let alias = interface[i];
            if(alias.family=="IPv4" && alias.address !="127.0.0.1" && !alias.internal){
                
                return alias.address;
            }
        }
    }
}

const path = require('path'),
    webpack = require("webpack"),
    merge = require('webpack-merge'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    common = require('./webpack.base.js');
//config
const config = require('../config.js');
const NODE_ENV = process.env.NODE_ENV || 'dev';
let HtmlWebpackConfig = config['devTemplate'];
Object.assign(HtmlWebpackConfig, config[NODE_ENV]);
module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: '../',
        open: true,
        inline: true,
        host:getIPAddress()
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'BASE_CONFIG': JSON.stringify(config[NODE_ENV])
        }),
        new HtmlWebpackPlugin(HtmlWebpackConfig),
        
    ]
});
