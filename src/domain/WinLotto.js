const Lotto = require("./Lotto");

class WinLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (1 > bonusNumber || bonusNumber > 45) throw new Error();
    if (super.numbers.includes(bonusNumber)) throw new Error();
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinLotto;
