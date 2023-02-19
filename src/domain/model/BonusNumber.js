const exception = require('../../utils/exception');

class BonusNumber {
  #number;

  constructor(winningNumbers, input) {
    exception.handleBonusNumber(winningNumbers, input);

    this.#number = Number(input);
  }

  getNumber() {
    return this.#number;
  }
}

module.exports = BonusNumber;
