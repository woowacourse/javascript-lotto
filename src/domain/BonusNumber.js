const { LOTTO } = require('./constants');

class BonusNumber {
  #number = 0;

  constructor(bonusNumber) {
    this.#number = bonusNumber;

    this.validateBonusLotto();
  }

  validateBonusLotto() {
    if (!this.isValidBonusNumber()) {
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 이내의 숫자여야 합니다.');
    }
  }

  isValidBonusNumber() {
    this.#number = Number(this.#number);

    return this.#number >= LOTTO.min && this.#number <= LOTTO.max;
  }

  get number() {
    return this.#number;
  }
}

module.exports = BonusNumber;
