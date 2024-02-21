import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class WinningLotto {
  #numbers;

  #bonusNumber = 0;

  constructor(numbers) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  setBonusNumber(bonusNumber) {
    bonusNumberValidator.validateDuplication(this.#numbers, bonusNumber);
    this.#bonusNumber = Number(bonusNumber);
  }
}
export default WinningLotto;
