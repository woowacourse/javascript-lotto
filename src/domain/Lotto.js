import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}
export default Lotto;
