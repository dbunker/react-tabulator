var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var port = 8080
var config = require('./dev.config.js')('0.0.0.0', port);

var app = new WebpackDevServer(webpack(config), {
  contentBase: './static',
  historyApiFallback : true,
  stats: { colors: true },
  hot: false
})

app.listen(port, '0.0.0.0', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log('Listening at localhost:' + port);
});
