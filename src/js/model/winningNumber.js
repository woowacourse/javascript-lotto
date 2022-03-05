export const winningNumber = {
  store: {
    numbers: [],
    bonusNumber: [],
  },

  getWinningNumber() {
    return this.store.numbers;
  },

  getBonusNumber() {
    return this.store.bonusNumber;
  },

  setWinningNumber(number) {
    this.initializeWinningNumber();
    this.store.numbers.push(number.slice(0, 6));
    this.store.bonusNumber.push(number.slice(6));
  },

  initializeWinningNumber() {
    this.store.numbers = [];
    this.store.bonusNumber = [];
  },
};
