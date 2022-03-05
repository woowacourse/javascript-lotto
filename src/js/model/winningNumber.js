export const winningNumber = {
  numbers: [],
  bonusNumber: 0,

  getWinningNumber() {
    return this.numbers[0];
  },

  getBonusNumber() {
    return this.bonusNumber;
  },

  setWinningNumber(number) {
    this.initializeWinningNumber();
    this.numbers.push(number.slice(0, 6));
    this.bonusNumber = number.slice(6)[0];
  },

  initializeWinningNumber() {
    this.numbers = [];
    this.bonusNumber = 0;
  },
};
