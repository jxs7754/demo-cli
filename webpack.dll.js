const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
    axios: ['axios', 'qs'],
    // ui: ['element-ui'],
  },
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    path: path.join(__dirname, 'build'),
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'build/[name].json'),
    }),
  ],
};
