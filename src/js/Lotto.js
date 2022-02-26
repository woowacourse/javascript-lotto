import { LOTTO_NUMBER } from './constants/constants';
import { generateRandomInRange } from './utils/util';

export default class Lotto {
  #numbers;

  constructor() {
    this.#numbers = this.generateNumbersAutomatically();
  }

  get numbers() {
    return this.#numbers;
  }

  generateNumbersAutomatically() {
    const numbers = new Set();

    while (numbers.size !== LOTTO_NUMBER.LENGTH) {
      const randomNumber = generateRandomInRange(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX);
      numbers.add(randomNumber);
    }

    return numbers;
  }
}
