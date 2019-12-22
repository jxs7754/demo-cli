module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  // plugins: [
  //   'import'
  // ],
  // settings: {
  //   // 'import/resolver': 'webpack'
  //   'import/resolver': {
  //     webpack: {
  //       // config: 'webpack.dev.js',
  //     },
  //   },
  // },
  extends: [
    require.resolve('eslint-config-airbnb-base'),
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'],
        ],
      },
  
      // webpack: {
      //   // config: require.resolve('./webpack.dev.js'),
      // },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 0,
    'arrow-parens': 0,
    // 'comma-dangle': [2, 'never'],
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'no-underscore-dangle': 0,
    radix: 0,
    'prefer-const': 0,
    'prefer-destructuring': [
      'error', {
        'object': true,
        'array': false,
      }],
    'linebreak-style': [0, 'error', 'windows'],
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
};
