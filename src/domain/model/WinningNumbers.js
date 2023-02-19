const exception = require('../../utils/exception');

class WinningNumbers {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbersInput, bonusNumberInput) {
    exception.handleWinningNumbers(winningNumbersInput);
    const winningNumbers = winningNumbersInput.split(',').map(Number);

    this.#winningNumbers = winningNumbers;

    exception.handleBonusNumber(winningNumbers, bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinningNumbers;
