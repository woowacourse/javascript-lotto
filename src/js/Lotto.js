import { LOTTO_NUMBER } from './constants/constants';
import { generateIntegerArray } from './utils/util';

export default class Lotto {
  #numbers;

  constructor(numbers = this.generateNumbersAutomatically()) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  generateNumbersAutomatically() {
    return generateIntegerArray(LOTTO_NUMBER.MAX).sort(() => Math.random() - 0.5).slice(0, LOTTO_NUMBER.LENGTH);
  }
}
