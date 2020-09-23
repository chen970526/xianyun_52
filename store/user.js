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

export const actions = {};
