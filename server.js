var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var hostname = config.devServer.hostname
var port = config.devServer.port

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(port, hostname, function (err, result) {
	if (err) {
		return console.log(err)
	}

	console.log(`Listening at http://${hostname}:${port}/`)
})
