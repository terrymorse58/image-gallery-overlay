var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: "development",
  entry: {
    products: './carousel.js'
  },
  output: {
    library: 'OLCarousel',
    path: path.resolve(__dirname, 'build/js'),
    filename: 'carousel.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: 'verbose',
  devtool: 'source-map'
};
