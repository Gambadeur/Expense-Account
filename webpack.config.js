/* eslint-disable */

var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var hostname = argv.h || '0.0.0.0';
var port = argv.p || 10080;

var apiUrl = '';
var frontendUrl = '';

var config = {
    appName: 'Expense-account',
    apps: {
        frontend: {
            server_url: apiUrl,
            api_url: apiUrl + '/api',
            enableDevTools: true
        }
    },
    babel_ignore: /node_modules\/(?!admin-config|fakerest)/
};

var module;

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${hostname}:${port}`,
        'webpack/hot/only-dev-server',
        './index'
    ],
    output: {
        path: '/js',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(config.appName),
            SERVER_URL: JSON.stringify(config.apps.frontend.server_url),
            API_URL: JSON.stringify(config.apps.frontend.api_url)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        hostname: hostname,
        port: port
    }
};
