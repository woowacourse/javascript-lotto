import { validateLottoNumber } from '../validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    validateLottoNumber(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
