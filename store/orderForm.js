export const state = () => {
  return {
    orderFormdata: {}
  };
};

export const mutations = {
  setorderFormdata(state, data) {
    state.orderFormdata = data;
  }
};
