var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var output = path.join(__dirname, '../static');

var name = 'word-count';

var properties = {
  DATA_URL: '"/data/data-' + name + '.json"',
  CONTAINER: '"root-' + name + '"',
  ENV: '"prod"'
};

module.exports = {
  context: path.resolve(__dirname, '..'),
  resolve: {
    root: [path.join(__dirname, '../app')],
    modulesDirectories: ['node_modules'],
    extensions : ['', '.js', '.jsx']
  },
  entry: [
    './app/main.js'
  ],
  output: {
    path: output,
    filename: 'bundle-' + name + '.js',
  },
  plugins: [],
  progress: true,
  module: {
    loaders: [{
      test: /\.js.*$/,
      loader: 'babel?optional[]=runtime&stage=0',
      exclude: /node_modules/
    }, {
      test: /\.png.*$/,
      loaders: ['url-loader?limit=100000&mimetype=image/png'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader')
    }]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin(properties),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
      warnings: false,
      },
    }),
  ],
  cssnext: {
    import: {
      path: ['']
    },
    features: {
    }
  }
};
