const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:path.resolve(__dirname,"..","src","js","web.js"),
    output:{
      path:path.resolve(__dirname,"..","dist"),
      filename:'js/[name].[hash].js'
    },
    module:{
      rules:[
        {
          test:/\.scss$/ig,
          use:extractTextWebpackPlugin.extract({
            fallback:"style-loader",
            use:['css-loader',{
              loader:'postcss-loader',
              options:{
                sourceMap:true,
                config:{
                  path:"postcss.config.js"
                }
              }
            },'sass-loader']
          })
        },
        {
          test:/\.css$/ig,
          use:['style-loader','css-loader']
        },
        {
          test:/\.(jpe?g|png|gif|svg)$/ig,
          use:[
            {
              loader:"url-loader",
              options:{
                limit:400,
                name:"img/[name][hash:7].[ext]",
                publicPath:"../"
              }
            }
          ]
        }
      ]
    },
    plugins:[
      new cleanWebpackPlugin([
        path.resolve(__dirname,"..","dist")
      ]),
      new extractTextWebpackPlugin({
        filename:"css/[name].css"
      }),
      new htmlWebpackPlugin({
        template:path.resolve(__dirname,"..","src","index.html"),
        inject:"body"
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV':JSON.stringify('production')
        }
      })
    ]
}
