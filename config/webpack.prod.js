const  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
merge = require('webpack-merge'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
common = require('./webpack.base.js');
module.exports = merge(common, {
   plugins: [
     new UglifyJsPlugin(),
     new CopyWebpackPlugin(
       [{from:path.resolve(src,"img"),to:`${dist}/img/[name].[ext]`}]
     )
   ]
});
