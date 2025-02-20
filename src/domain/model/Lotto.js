import { validateLottoNumber } from '../validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    validateLottoNumber(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
