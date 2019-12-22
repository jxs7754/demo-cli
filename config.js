module.exports = {
  publicPath: '/xihu/',
  outputDir: 'dist',
  assetsDir: '',
  proxy: {},
  dllList: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
    axios: ['axios', 'qs'],
    ui: ['element-ui', 'echarts', 'd3'],
  },
};
