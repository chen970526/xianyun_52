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
  },
  removedata(state) {
    state.userstate = {};
  }

};

export const actions = {
  registeruser({
    commit
  }, data) {
    return this.$axios({
      method: 'post',
      url: '/accounts/register',
      data
    }).then(res => {
      return res;
    });
  },
  loginActions({
    commit
  }, data) {
    return this.$axios({
      method: 'post',
      url: '/accounts/login',
      data
    }).then(res => {
      commit('increment', res.data);
      return res;
    });
  },
  getcaptcha({
    commit
  }, data) {
    return this.$axios({
      method: 'post',
      url: '/captchas',
      data
    }).then(res => {
      return res;
    });
  },
  // JiPiao - 实时机票城市
  /// airs/city
  seatchdata({
    commit
  }, data) {
    return this.$axios({
      url: 'airs/city',
      params: data
    }).then(res => {
      return res;
    });
  }
};
