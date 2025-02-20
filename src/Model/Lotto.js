import { LOTTO_NUMBER_LENGTH } from '../constants/common.js';

class Lotto {
  #numbers = Array.from({ length: LOTTO_NUMBER_LENGTH }).fill(0);

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
