const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    merge = require('webpack-merge'),
    path = require('path'),
    webpack = require("webpack"),
    dist = path.resolve(__dirname, "..", 'dist'),
    src = path.resolve(__dirname, "..", 'src'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    common = require('./webpack.base.js');
//config
const config = require('../config.js');
const NODE_ENV = process.env.NODE_ENV || 'prod';
let HtmlWebpackConfig = {
    filename: 'index.html',
    title: "生产环境",
    template: path.resolve(src, "index.html"),
    inject: "body",
    chunks: ['index'],
    hash: true
};
Object.assign(HtmlWebpackConfig, config[NODE_ENV]);
module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'BASE_CONFIG': JSON.stringify(config[NODE_ENV])
        }),
        new UglifyJsPlugin(),
        new HtmlWebpackPlugin(HtmlWebpackConfig),
        new CopyWebpackPlugin(
            [
                { 
                    from: path.resolve(src, "img"),
                    to: `${dist}/img/[name].[ext]` 
                }
            ]
        )
    ]
});
