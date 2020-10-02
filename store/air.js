export const state = () => {
  return {
    searchHistory: [],
    price: 0
  };
};
export const mutations = {
  setSearchHistory(state, data) {
    console.log(state.searchHistory);
    console.log(data);
    let index = state.searchHistory.findIndex(i => {
      for (let p in i) {
        console.log(p);
        return i[p] === data[p];
      }
    });
    if (index === -1) {
      state.searchHistory.unshift(data);
    } else {
      state.searchHistory.splice(index, 1);
      state.searchHistory.unshift(data);
    }
    // state.searchHistory.unshift(data);
  },
  setPrice(state, data) {
    state.price = data;
  }
};
