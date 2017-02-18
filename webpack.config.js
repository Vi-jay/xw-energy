const webpack = require('webpack'),
    path = require('path');
const model = 'qianduan';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyl = new ExtractTextPlugin('../css/'+model+'.css');
const extractCSS = new ExtractTextPlugin('../css/'+model+'.css');
module.exports = {
    entry: './src/js',
    output: {
        path: __dirname + '/dist/' + model + '/js',
        filename: model + '.js',
    },
    module: {
        loaders: [{
            test: /\.js/,
            loader: 'babel-loader',
            include: /js/
        },
            {
                test: /\.css/,
                use: extractCSS.extract(['style-loader','css-loader']),
                include: /css/
            },
            {
                test: /\.styl/,
                use: extractStyl.extract(['css-loader', 'stylus-loader']),
                include: /css/
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|gif)/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=819200&name=images/[hash:8].[name].[ext]'
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
            }]
    },
    plugins: [
        extractCSS,
        extractStyl
    ],
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: [ '.js', '.json', '.styl'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    },
    devServer: {
        compress: true,
        port: 9000,
        hot: true,
        inline:true
    }
};