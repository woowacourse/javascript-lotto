const exception = require('../../utils/exception');

class WinningNumbers {
  #numbers;

  constructor(input) {
    exception.handleWinningNumbers(input);
    const winningNumbers = input.split(',').map(Number);

    this.#numbers = winningNumbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

module.exports = WinningNumbers;
