import { isPositiveInteger, isValidRangeNumber } from '../utils/validator';

export default class WinningNumbers {
  #numbers;

  constructor() {
    this.#numbers = new Set();
  }

  get numbers() {
    return this.#numbers;
  }

  pushNumber(number) {
    if (!isPositiveInteger(number)) {
      return;
    }
    if (!isValidRangeNumber(1, 45, number)) {
      return;
    }
    this.#numbers.add(number);
  }
}
