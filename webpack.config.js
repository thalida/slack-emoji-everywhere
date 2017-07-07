const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC =  path.join(__dirname, '/extension/src');
const DIST =  path.join(__dirname, '/extension/dist');

module.exports = {
    context: SRC,
    entry: {
        background: './background',
        content_script: './content_script',
        popup: './popup',
    },
    output: {
        path: DIST,
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'resolve-url-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                include: SRC,
                use: [{ loader: 'ng-annotate-loader' }],
            },
            {
                test: /\.html$/,
                use: [
                    'ngtemplate-loader?relativeTo=' + SRC + '/',
                    'html-loader',
                ],
                exclude: path.resolve(SRC, 'popup/index.html')
            },
            {
                test: /\.woff(2)?(\?]?.*)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png|gif|jpg|jpeg|wav|mp3)(\?]?.*)?$/,
                use: 'file-loader?[path][name].[ext]'
            },
            {
                test: /\.(json)(\?]?.*)?$/,
                use: 'json-loader'
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            template: SRC + '/popup/index.html',
            filename: 'popup.html',
            inject: true,
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '/extension/'),
            verbose: true,
            dry: false
        })
    ],
};

