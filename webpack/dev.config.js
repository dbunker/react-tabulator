var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var output = path.join(__dirname, '../static');

var properties = {
  DATA_URL: '"/data/data-dev.json"',
  CONTAINER: '"root-dev"',
  ENV: '"dev"'
}

module.exports = function(host, port) {
  return {
    context: path.resolve(__dirname, '..'),
    devtool: 'source-map',
    resolve: {
      root: [path.join(__dirname, '../app')],
      modulesDirectories: ['node_modules'],
      extensions : ['', '.js', '.jsx']
    },
    entry: [
      './app/main.js',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://' + host + ':' + port
    ],
    output: {
      path: output,
      filename: 'bundle.js',
    },
    plugins: [],
    progress: true,
    module: {
      loaders: [{
        test: /\.js.*$/,
        loader: 'react-hot!babel?stage=0',
        exclude: /node_modules/
      }, {
        test: /\.png.*$/,
        loaders: ['url-loader?limit=100000&mimetype=image/png'],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap!cssnext-loader'
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../static/index.html'),
        inject : 'body',
        hash : true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(properties)
    ],
    cssnext: {
      import: {
        path: ['']
      },
      features: {
      }
    }
  }
}
