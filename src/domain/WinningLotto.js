import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
  }
}
export default WinningLotto;
