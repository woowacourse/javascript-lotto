class BonusNumber {
  #bonusNumber = 0;

  constructor(bonusNumberInput, winningNumbers) {
    this.validate(parseInt(bonusNumberInput, 10), winningNumbers);
    this.#bonusNumber = parseInt(bonusNumberInput, 10);
  }

  validate(bonusNumber, winningNumbers) {
    if (!this.isValidBonusNumber(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 이내의 숫자여야 합니다.');
    }
    if (this.isDuplicateFor(bonusNumber, winningNumbers)) {
      throw new Error(
        '[ERROR] 보너스 번호와 당첨번호가 중복이 되어서는 안됩니다.'
      );
    }
  }

  isValidBonusNumber(bonusNumber) {
    return bonusNumber >= 1 && bonusNumber <= 45;
  }

  isDuplicateFor(bonusNumber, winningNumbers) {
    return winningNumbers.winningNumbers.includes(bonusNumber);
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = BonusNumber;
