const path = require('path'),
webpack = require("webpack"),
dist = path.resolve(__dirname,"..",'dist'),
merge = require('webpack-merge'),
common = require('./webpack.base.js');

module.exports = merge(common, {
  devtool:"inline-source-map",
  devServer:{
    contentBase:dist,
    open:true,
    inline:true,
    quiet:true
  },
  plugins:[new webpack.DefinePlugin({
    'DEBUG':JSON.stringify(process.env.NODE_ENV=="dev")
  })]
});
