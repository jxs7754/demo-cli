const path = require('path');
const glob = require('glob');

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// 友好的错误提示
// eslint-disable-next-line import/no-extraneous-dependencies
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 将css提取到单独的文件中
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// 添加preload prefetch
// eslint-disable-next-line import/no-extraneous-dependencies
const PreloadPlugin = require('@vue/preload-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 复制静态文件
const CopyPlugin = require('copy-webpack-plugin');
// vue需要添加的一个插件
const { VueLoaderPlugin } = require('vue-loader');

const config = require('./config.js');

const { assetsDir } = config;

function getAssetPath(filePath) {
  return assetsDir ? path.posix.join(assetsDir, filePath) : filePath;
}

const PATHS = {
  src: path.join(__dirname, 'src'),
};
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  entry: {
    index: './src/index.js',
    // main: './src/main.js',
  },
  output: {
    path: path.join(__dirname, config.outputDir),
    /* contenthash */
    filename: getAssetPath(
      `js/[name]${isDev ? '' : '_[contenthash:8]'}.js`,
    ),
    publicPath: config.publicPath,
  },
  resolve: {
    // 别名
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
            // include: [resolve('src')],
            // options: {
            //   name: 'js/[name]_[hash:8].[ext]',
            // },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                // 自动扩展css
                require('autoprefixer')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: getAssetPath('img/[name]_[hash:8].[ext]'),
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: getAssetPath('icon/[name]_[hash:8].[ext]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...['vue', 'axios'].map((item) => new webpack.DllReferencePlugin({
      context: path.join(__dirname, './build'),
      manifest: require(`./build/${item}.json`),
    })),
    
    new MiniCssExtractPlugin({
      filename: getAssetPath(
        `css/[name]${isDev ? '' : '_[contenthash:8]'}.css`,
      ),
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: '',
        ignore: ['*.html'],
      },
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/template.html'),
      filename: 'index.html',
      /* 用于多入口引用 */
      chunks: ['manifest', 'index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new PreloadPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [/\.map$/, /hot-update\.js$/],
    }),
    new PreloadPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
    }),
  ],
};
