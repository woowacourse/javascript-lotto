import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class WinningLotto {
  #numbers;

  #bonusNumber;

  constructor(numbers, bonusNumber) {
    lottoNumberValidator.validate(numbers);
    bonusNumberValidator.validateDuplication(numbers, bonusNumber);

    this.#numbers = numbers;
    this.#bonusNumber = Number(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
export default WinningLotto;
