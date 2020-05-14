import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login.vue';

Vue.use(VueRouter);

const routes = [
  // 登录页
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  // 主页
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue'),
  },
  // 异常页面
  {
    path: '/exception/:type',
    name: 'Exception',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "exception" */ '../views/exception.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   // 如果登录的时候设置过;
//   if (localStorage.getItem('token') != null) {
//     next();
//   } else {
//     // 如果没有设置这个值为空,说明没有登录，导向登录页
//     // eslint-disable-next-line no-lonely-if
//     if (to.name === 'login') {
//       next();
//     } else {
//       next({ path: '/login' });
//     }
//   }
// });

export default router;
