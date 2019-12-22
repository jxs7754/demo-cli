// webpack 合并
const merge = require('webpack-merge');
const webpack = require('webpack');
// 分离基础组件的（使用外联js）
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BoundAnalysisPlugin = require(
  'webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cssnano = require('cssnano');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 清除要打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base');
// 速度调试
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    // 打包分析
    // new BoundAnalysisPlugin(),
    // 清除打包的文件
    new CleanWebpackPlugin(),
    // 压缩css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // 缓存
    new HardSourceWebpackPlugin(),
    // 基础包分离
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
  
  ],
  optimization: {
    // 默认压缩
    minimize: true,
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
