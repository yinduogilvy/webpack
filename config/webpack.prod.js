const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const uglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin")
const path = require("path");

module.exports = merge(common,{
  devtool:'source-map',
  plugins:[
    new uglifyJsWebpackPlugin({
      sourceMap:true
    })
  ]
})
