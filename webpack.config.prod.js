const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackConfig = require('./webpack.config.base');
const extractLessPlugin = new ExtractTextPlugin('app.[hash].css');

WebpackConfig.output.path = 'dist';

WebpackConfig.module.loaders.push({
    test: /\.(css|less)$/,
    loader: extractLessPlugin.extract(
        'style', 'css!less?{"modifyVars":' + WebpackConfig.additionalOptions.less + '}'
    )
});

WebpackConfig.plugins = WebpackConfig.plugins.concat([
    extractLessPlugin,
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false
    })
]);

module.exports = WebpackConfig;