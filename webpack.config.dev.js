const WebpackConfig = require('./webpack.config.base');

WebpackConfig.output.path = 'dev';

WebpackConfig.module.loaders.push({
    test: /\.(css|less)$/,
    loader: 'style!css!less?{"modifyVars":' + WebpackConfig.additionalOptions.less + '}'
});

WebpackConfig.devServer = {
    contentBase: "./" + WebpackConfig.output.path,
    host: "0.0.0.0",
    port: 8080,
    inline: true
};

module.exports = WebpackConfig;