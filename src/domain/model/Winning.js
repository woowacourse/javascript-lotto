const utilFn = require('../../utils');

class Winning {
  #winningNumbers;

  #bonusNumber;

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  setWinningNumbers(winningNumbers) {
    this.#validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers;
  }

  setBonusNumber(bonusNumber) {
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      if (!utilFn.isNumber(winningNumber)) {
        throw new Error('[ERROR]');
      }

      if (!utilFn.isNumberInLottoRange(winningNumber)) {
        throw new Error('[ERROR]');
      }
    });
    if (!utilFn.isUniqueArray(winningNumbers)) {
      throw new Error('[ERROR]');
    }
  }
}

module.exports = Winning;
