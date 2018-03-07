const path = require('path'),
dist = path.resolve(__dirname,"..",'dist'),
src = path.resolve(__dirname,"..",'src'),
webpack = require("webpack"),
//Dashboard = require('webpack-dashboard'),
//DashboardPlugin = require('webpack-dashboard/plugin'),
WriteFileWebpackPlugin = require('write-file-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
HtmlWebpackPlugin = require("html-webpack-plugin"),
CleanWebpackPlugin = require('clean-webpack-plugin');
//dashboard = new Dashboard();
const statsArr = {
  'zh':'26984424300688c49d02f5eed4031a61',
  'migugame':'6cca1164ad57902944130e5193cec5cc',
  'brookstone':'c69e413e8efd2eb964460c9b5ac9b5ac',
  'zjyd':'d703449a63eadad220b77508bbd3b2f6',
  'shyd':'dddbc84f8b0595d74e1a148e6d189749'
}

module.exports = {
    entry: {
      index:path.resolve(src,"js","index.js")
    },
    output: {
        filename: 'js/[name].js',
        path: dist
    },
    resolve:{

    },
    module: {
        rules: [
          {
            test:/\.mp3$/,
            exclude: /(node_modules|bower_components)/,
            use:[{
              loader:"file-loader",
              options:{
                name:"img/[name].[ext]"
              }

            }]
          },
          {
            test:/\.(png|gif|jpeg|jpg)$/,
            exclude: /(node_modules|bower_components)/,
            use:[
              {
                loader:"url-loader",
                options:{
                  limit:1000,//1KB
                  publicPath:"../",
                  name:"img/[name].[ext]"
                }
              }
            ]
          },
          {
            test:/\.s?css$/,
            exclude: /(node_modules|bower_components)/,
            use:ExtractTextWebpackPlugin.extract({
              fallback:'style-loader',
              use:[
                {
                  loader:'css-loader',
                  options:{
                    importLoaders:1
                  }
                },
                'postcss-loader',
                "sass-loader"
              ]
            })
          },
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env'],
                      plugins: [
                        [
                          'transform-runtime',
                          {
                            "helpers":false,
                            "polyfill":false,
                            "regenerator":true,
                            "moduleName":"babel-runtime"
                          }
                        ],
                        'dynamic-import-webpack'
                      ]
                  }
              }
          }
      ]
    },
    plugins:[
      //new DashboardPlugin(dashboard.setData),
      new ExtractTextWebpackPlugin("css/mode.css"),
      new CleanWebpackPlugin(['dist/js/*.*','dist/*.*']),
      new HtmlWebpackPlugin({
        filename:'index.html',
        title:"测试使用",
        template:path.resolve(src,"index.html"),
        inject:"body",
        chunks:['index'],
        hash:true,
        stats:statsArr.shyd //统计代码
      }),
      new WriteFileWebpackPlugin(),
      new CopyWebpackPlugin(
        [{from:path.resolve(src,"img"),to:`${dist}/img/[name].[ext]`}]
      )
    ]
}
