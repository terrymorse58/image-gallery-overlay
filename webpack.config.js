const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: "development",
  entry: {
    products: './src/js/image-gallery.js'
  },
  output: {
    library: 'IGOverlay',
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'image-gallery.bundle.js'
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
