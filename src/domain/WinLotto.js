const Lotto = require("./Lotto");

class WinLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#bonusNumber = bonusNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  get numbers() {
    return super.numbers;
  }
}

module.exports = WinLotto;
