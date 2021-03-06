import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import user from './modules/user';

Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
  },
});
