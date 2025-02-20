import { validLottoNumber } from './validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    validLottoNumber(numbers);
  }
}

export default Lotto;
