const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const config = require('./config.js');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: false,
    hot: true,
    publicPath: config.publicPath,
    proxy: config.proxy,
    open: true,
    noInfo: true,
  },
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(baseConfig, devConfig);
