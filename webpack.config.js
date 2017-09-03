var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "webpack-hot-middleware/client?reload=true",
        "react-hot-loader/patch",
        "./src/index.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                rules: [
                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                    }
                ]
            },
            //{
            //    test: /\.js$/,
            //    loaders: ['react-hot-loader/webpack', 'babel']
            //},
            {
                //use: [
                //    'react-hot-loader'
                //],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                test: /\.jsx$/
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules\/(?!other-module)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy' ,'transform-runtime']
                }
            },
            {
                test: /\.jade$/,
                loader:  'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'index.html',
            template: path.join('./server/views', 'index.jade')
        })
    ]
};