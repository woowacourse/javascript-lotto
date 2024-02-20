import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    lottoNumberValidator.validateNumbersLength(numbers);
    lottoNumberValidator.validateDuplicate(numbers);
    lottoNumberValidator.validateRange(numbers);

    this.#numbers = numbers;
  }
}
export default Lotto;
