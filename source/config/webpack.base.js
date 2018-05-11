const path = require('path'),
    dist = path.resolve(__dirname, "../../"),
    src = path.resolve(__dirname, "..", 'src'),
    webpack = require("webpack"),
    WriteFileWebpackPlugin = require('write-file-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    config = require("../config.js");

let {devTemplate,prodTemlate} = config;


module.exports = {
    entry: {
        index: path.resolve(src, "js", "index.js")
    },
    output: {
        filename: 'js/[name].js',
        path: dist
    },
    resolve: {
    },
    module: {
        rules: [
            {
                test: /\.(mp3|ttf|eot|woff|svg)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "img/[name].[ext]"
                    }

                }]
            },
            {
                test: /\.(png|gif|jpeg|jpg)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1000,//1KB
                            publicPath: "../",
                            name: "img/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
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
                                    "helpers": false,
                                    "polyfill": false,
                                    "regenerator": true,
                                    "moduleName": "babel-runtime"
                                }
                            ],
                            'dynamic-import-webpack'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(dist,"img"),
            path.resolve(dist,"css"),
            path.resolve(dist,"js"),
            path.resolve(dist,devTemplate.filename),
            path.resolve(dist,prodTemlate.filename),
        ],{
            root:path.resolve(__dirname,"../../../"),
            exclude:['source',"*.php",".git",".gitignore","README.md"],
            verbose:true,
            dry:false
        }),
        new ExtractTextWebpackPlugin("css/mode.css"),
        new CopyWebpackPlugin(
            [
                { 
                    from: path.resolve(src, "img"),
                    to: `${dist}/img/` 
                }
            ]
        )
    ]
}
