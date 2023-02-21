const Lotto = require('./Lotto');
const validator = require('../validation/validator');
const { errorMessage } = require('../../constants/constants');

class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    if (
      !validator.winningNumbers(winningNumbers) ||
      !validator.bonusNumber(winningNumbers, bonusNumber)
    )
      throw new Error(errorMessage.NUMBER_DUPLICATED_ERROR);

    this.#winningLotto = new Lotto(winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  getWinningNumbers() {
    return this.#winningLotto.getNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinningLotto;
