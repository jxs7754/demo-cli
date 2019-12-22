import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'search1',
      },
    },
    // {
    //   path: '/search1',
    //   name: 'search1',
    //   component: () => import(/* webpackChunkName: "search1" */ '@/views/search1.vue'),
    // },
    // {
    //   path: '/search2',
    //   component: () => import(/* webpackChunkName: "search2" */ '@/views/search2.vue'),
    // },
    // {
    //   path: '/search3',
    //   component: () => import(/* webpackChunkName: "search3" */ '@/views/search3.vue'),
    // },
    {
      path: '/search4',
      component: () => import(/* webpackChunkName: "search4" */ '@/views/search4.vue'),
    },
    {
      path: '/search5',
      component: () => import(/* webpackChunkName: "search5" */ '@/views/search5.vue'),
    },
    {
      path: '/search6',
      component: () => import(/* webpackChunkName: "search6" */ '@/views/search6.vue'),
    },
  ],
});

export default router;
