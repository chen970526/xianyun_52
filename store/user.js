export const state = () => {
  return {
    userstate: {
      token: '',
      user: {}
    }
  };
};

export const mutations = {
  increment(state, data) {
    state.userstate = data;
  }
};

export const actions = {
  loginActions({ commit }, data) {
    return this.$axios({
      method: 'post',
      url: '/accounts/login',
      data
    }).then(res => {
      commit('increment', res.data);
      return res;
    });
  },
  getcaptcha({ commit }, data) {
    return this.$axios({
      method: 'post',
      url: '/captchas',
      data
    }).then(res => {
      return res;
    });
  }
};
