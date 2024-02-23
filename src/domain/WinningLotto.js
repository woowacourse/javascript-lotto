import bonusNumberValidator from "../validator/BonusNumberValidator.js";

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(LottoNumbers, bonusNumber) {
    bonusNumberValidator(LottoNumbers.getNumbers(), bonusNumber);

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
