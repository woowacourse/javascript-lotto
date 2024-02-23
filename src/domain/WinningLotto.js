import bonusNumberValidator from "../validator/BonusNumberValidator.js";

class WinningLotto {
  #numbers;

  #bonusNumber;

  constructor(LottoNumbers, bonusNumber) {
    bonusNumberValidator.validate(bonusNumber);

    bonusNumberValidator.validateDuplication(
      LottoNumbers.getNumbers(),
      bonusNumber,
    );

    this.#numbers = LottoNumbers.getNumbers();
    this.#bonusNumber = bonusNumber;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
