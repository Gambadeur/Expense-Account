/* eslint-disable */
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var apiUrl = '';

var config = {
	appName: 'Expense-account',
	apps: {
		frontend: {
			server_url: apiUrl,
			api_url: apiUrl + '/api'
		}
	},
	babel_ignore: /node_modules\/(?!admin-config|fakerest)/
};

var module;

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: ['babel-polyfill', './index'],
	output: {
		publicPath: '/',
		filename: 'bundle-[chunkhash].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			},
			APP_NAME: JSON.stringify(config.appName),
			SERVER_URL: JSON.stringify(config.apps.frontend.server_url),
			API_URL: JSON.stringify(config.apps.frontend.api_url)
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			title: config.appName,
			template: 'index.ejs'
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['babel']
		}, {
			test: /\.css$/
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
