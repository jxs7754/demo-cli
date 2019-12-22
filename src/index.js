/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';

import router from './router/router.js';
import store from './store/index';
import './assets/icon/iconfont.scss';

import PioLayout from '@/components/layout.vue';
/* element */
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI, {
//   size: 'small',
//   zIndex: 1000,
// });

Vue.component('pio-layout', PioLayout);
const app = new Vue({
  router,
  store,
  data:{
    message: 'hello Vue!'
  },
  render: h => h(App),
}).$mount('#app');
console.log(app.data);
console.log(app._data.message);
console.log(app.message);
