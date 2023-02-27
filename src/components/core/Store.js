import { observable } from './Observer';

const store = {
  state: observable({
    buyLottos: [],
    winningRanks: [],
    profitRate: 0,
    isModal: false,
  }),

  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!(key in this.state)) return;
      this.state[key] = value;
    });
  },
};

export default store;
