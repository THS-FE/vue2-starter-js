import Vue from 'vue';
import 'normalize.css';
import './assets/styles/style.scss';

import './plugins'; // 按需引入插件

import App from './app.vue';
import router from './router';
import store from './store'; // 按需使用状态管理


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
