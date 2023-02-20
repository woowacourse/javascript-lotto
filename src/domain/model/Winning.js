const { inputValidator } = require('../../utils');
const { ERROR_MESSAGE, LOTTO_NUMBER } = require('../../constant');

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
      this.#validateRangeAndIsNumber(winningNumber);
    });
    if (!inputValidator.isUniqueArray(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.uniqueWinningNumber);
    }
    if (winningNumbers.length !== LOTTO_NUMBER.winningNumberCount) {
      throw new Error(ERROR_MESSAGE.winningNumberCount);
    }
  }

  #validateBonusNumber(bonusNumber) {
    this.#validateRangeAndIsNumber(bonusNumber);

    if (!inputValidator.isUniqueArray([...this.#winningNumbers, bonusNumber])) {
      throw new Error(ERROR_MESSAGE.uniqueBonusNumber);
    }
  }

  #validateRangeAndIsNumber(number) {
    if (!inputValidator.isNumber(number)) {
      throw new Error(ERROR_MESSAGE.number);
    }

    if (!inputValidator.isNumberInLottoRange(number)) {
      throw new Error(ERROR_MESSAGE.lottoRange);
    }
  }
}

module.exports = Winning;
