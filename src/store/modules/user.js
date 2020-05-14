import { login } from '@/services/user';
import { SET_USERNAME, SET_PASSWORD } from '../mutation-types';

const userState = {
  // 用户名
  userName: '',
  // 密码
  password: '',
};

const getters = {

};

const actions = {
  /**
   * 用户登录
   * @async
   * @param {function} commit
   * @param {Object} params
   * @returns {boolean} 是否跳转页面
   */
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params).then((response) => {
        commit(SET_USERNAME, params.userName);
        commit(SET_PASSWORD, params.password);
        resolve(response);
      }).catch((err) => reject(err));
    });
  },
};

const mutations = {
  [SET_USERNAME](state, userName) {
    state.userName = userName;
  },

  [SET_PASSWORD](state, password) {
    state.password = password;
  },
};

export default {
  namespaced: true, // 让 mutations、getters、actions 也按照模块划分
  state: userState,
  getters,
  actions,
  mutations,
};
