const exception = require('../../utils/exception');
const Lotto = require('./Lotto');

class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    exception.checkBonusNumber(winningNumbers, bonusNumber);

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
