const path = require('path'),
    dist = path.resolve(__dirname, "..", 'dist'),
    src = path.resolve(__dirname, "..", 'src'),
    webpack = require("webpack"),
    //Dashboard = require('webpack-dashboard'),
    //DashboardPlugin = require('webpack-dashboard/plugin'),
    WriteFileWebpackPlugin = require('write-file-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin');
//dashboard = new Dashboard();

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
                test: /\.mp3$/,
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
        //new DashboardPlugin(dashboard.setData),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextWebpackPlugin("css/mode.css"),
        new HtmlWebpackPlugin()
    ]
}
