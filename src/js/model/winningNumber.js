export const winningNumber = {
  numbers: [],
  bonusNumber: 0,

  getWinningNumbers() {
    return this.numbers[0];
  },

  getBonusNumber() {
    return this.bonusNumber;
  },

  setWinningNumbers(number) {
    this.initializeWinningNumbers();
    this.numbers.push(number.slice(0, 6));
    this.bonusNumber = number.slice(6)[0];
  },

  initializeWinningNumbers() {
    this.numbers = [];
    this.bonusNumber = 0;
  },
};
