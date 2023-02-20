const { MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER } = require('./constants');

class BonusNumber {
  #number = 0;

  constructor(bonusNumberInput, winningNumbers) {
    this.validate(parseInt(bonusNumberInput, 10), winningNumbers);
    this.#number = parseInt(bonusNumberInput, 10);
  }

  validate(bonusNumber, winningNumbers) {
    if (!this.isValidBonusNumber(bonusNumber)) {
      throw new Error(
        `[ERROR] 보너스 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자여야 합니다.`
      );
    }
    if (this.isDuplicateFor(bonusNumber, winningNumbers)) {
      throw new Error(
        '[ERROR] 보너스 번호와 당첨번호가 중복이 되어서는 안됩니다.'
      );
    }
  }

  isValidBonusNumber(bonusNumber) {
    return bonusNumber >= MIN_LOTTO_NUMBER && bonusNumber <= MAX_LOTTO_NUMBER;
  }

  isDuplicateFor(bonusNumber, winningNumbers) {
    return winningNumbers.numbers.includes(bonusNumber);
  }

  get number() {
    return this.#number;
  }
}

module.exports = BonusNumber;
