const path = require('path'),
    webpack = require("webpack"),
    dist = path.resolve(__dirname, "..", 'dist'),
    src = path.resolve(__dirname, "..", 'src'),
    merge = require('webpack-merge'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    common = require('./webpack.base.js');
//config
const config = require('../config.js');
const NODE_ENV = process.env.NODE_ENV || 'dev';
let HtmlWebpackConfig = {
    filename: 'index.html',
    title: "开发环境",
    template: path.resolve(src, "index.html"),
    inject: "body",
    chunks: ['index'],
    hash: true
};
Object.assign(HtmlWebpackConfig, config[NODE_ENV]);
module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        open: true,
        inline: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'BASE_CONFIG': JSON.stringify(config[NODE_ENV])
        }),
        new HtmlWebpackPlugin(HtmlWebpackConfig),
        new CopyWebpackPlugin(
            [
                { 
                    from: path.resolve(src, "img"),
                    to: `${dist}/img/` 
                }
            ]
        )
    ]
});
