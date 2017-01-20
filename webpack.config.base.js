const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Webpack = require('webpack');

const lessVars = require('./less.config.js');

module.exports = {

    entry: './js/main.js',
    output: {
        path: '',
        filename: 'app.[hash].js'
    },
    resolve: {
        modules: [
            'node_modules'
        ]
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1&name=img/[name].[ext]'
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebApp',
            inject: false,
            template: 'index.ejs',
            filename: 'index.html',
            mobile: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery',
            Bootstrap: 'bootstrap'
        }),
        new WebpackCleanupPlugin()
    ],

    additionalOptions: {
        'less': JSON.stringify(lessVars)
    }
};

