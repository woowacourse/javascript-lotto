import { LOTTO } from '../constants/constants.js';
import { generateRandomNumberRange } from './utils.js';
export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  set numbers(numbers) {
    this.#numbers = numbers;
  }

  pickNumbers() {
    const set = new Set();
    while (set.size < LOTTO.NUMBER_QUANTITY) {
      set.add(generateRandomNumberRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
    }
    return [...set];
  }
}
