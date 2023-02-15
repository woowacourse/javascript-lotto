class BonusNumber {
  #bonusNumber = 0;

  constructor(bonusNumberInput) {
    this.#validate(parseInt(bonusNumberInput, 10));
    this.#bonusNumber = parseInt(bonusNumberInput, 10);
  }

  #validate(bonusNumber) {
    if (!this.#isValidBonusNumber(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 이내의 숫자여야 합니다.');
    }
  }

  #isValidBonusNumber(bonusNumber) {
    return bonusNumber >= 1 && bonusNumber <= 45;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = BonusNumber;
