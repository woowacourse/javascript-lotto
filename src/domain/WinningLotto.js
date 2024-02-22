import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
    this.#bonusNumber = 0;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  setBonusNumber(bonusNumber) {
    bonusNumberValidator.validateDuplication(
      this.#numbers,
      Number(bonusNumber),
    );
    this.#bonusNumber = Number(bonusNumber);
  }
}
export default WinningLotto;
