export const winningNumber = {
  store: {
    numbers: [],
    bonusNumber: [],
  },

  getWinningNumber() {
    return this.store;
  },

  setWinningNumber(number) {
    this.store.push(number.slice(0, 6));
    this.store.push(number.slice(6));
  },

  initializeWinningNumber() {
    this.store.numbers = [];
    this.store.bonusNumber = [];
  },
};
