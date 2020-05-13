import Vue from 'vue';

// Element
import './element';

// 全局事件插件
import EventBus from 'vue-event-proxy';
// Vue 组合API
import VueCompositionApi from '@vue/composition-api';

Vue.use(EventBus);

Vue.use(VueCompositionApi);
