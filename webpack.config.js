const argv = require('yargs').argv;
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const env = argv.env === 'prod'?'prod':'dev';
const dist = argv.dist !== 'dist' ? 'dist': argv.dist;

var extractLessPlugin = null;

if (env === 'prod') {
    extractLessPlugin = new ExtractTextPlugin('app.[hash].css');
}

const plugins  = {
    'prod': [
        extractLessPlugin,

        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.OccurenceOrderPlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                minimize: true,
                collapseWhitespace: true,
                conservativeCollapse: false,
                collapseInlineTagWhitespace: true,
                removeAttributeQuotes: false,
                caseSensitive: true,
                customAttrSurround: [
                    [/#/, /(?:)/],
                    [/\*/, /(?:)/],
                    [/\[?\(?/, /(?:)/],
                ],
                customAttrAssign: [/\)?\]?=/],
            }
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery',
            Bootstrap: 'bootstrap'
        })
    ],
    'dev' : [
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery',
            Bootstrap: 'bootstrap'
        })
    ]
};

const loaders = {
    'prod': [
        {
            test: /\.js/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.(css|less)$/,
            loader: env === 'prod' ? extractLessPlugin.extract(
                'style', 'css!less?{"modifyVars":{"black":"blue"}}'
            ) : null
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
    ],
    'dev': [
        {
            test: /\.js/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.(css|less)$/,
            loader: 'style!css!less?{"modifyVars":{"black":"#000"}}'
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
};

module.exports = {
    entry: './js/main.js',
    output: {
        path: env == 'prod' ? dist : '',
        filename: env == 'prod' ? 'app.[hash].js' : 'bundle.js'
    },
    resolve: {
        modules: [
            'node_modules'
        ]
    },
    module: {
        loaders: loaders[env]
    },
    plugins: plugins[env]
};