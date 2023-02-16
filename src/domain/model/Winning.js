const { ERROR_MESSAGE, MAGIC_NUMBER } = require('../../constant');
const { inputValidator } = require('../../utils');

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
      if (!inputValidator.isNumber(winningNumber)) {
        throw new Error(ERROR_MESSAGE.number);
      }
      if (!inputValidator.isNumberInLottoRange(winningNumber)) {
        throw new Error(ERROR_MESSAGE.lottoRange);
      }
    });
    if (!inputValidator.isUniqueArray(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.uniqueWinningNumber);
    }
    if (winningNumbers.length !== MAGIC_NUMBER.winningNumberCount) {
      throw new Error(ERROR_MESSAGE.winningNumberCount);
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (!inputValidator.isNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.number);
    }

    if (!inputValidator.isNumberInLottoRange(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.lottoRange);
    }

    if (!inputValidator.isUniqueArray([...this.#winningNumbers, bonusNumber])) {
      throw new Error(ERROR_MESSAGE.uniqueBonusNumber);
    }
  }
}

module.exports = Winning;
