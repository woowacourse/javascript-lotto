import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    LottoNumbersValidator.validate(numbers);

    this.#numbers = this.#sortNumbersAscending(numbers);
  }

  #sortNumbersAscending(numbers) {
    return numbers.sort();
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
