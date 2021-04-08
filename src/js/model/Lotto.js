import { LOTTO_NUMBERS } from '../utils/constants.js';
import { getRandomNumber } from '../utils/utils.js';

export default class Lotto {
  constructor() {
    this._numbers = new Set();
  }

  initNumbers() {
    while (this._numbers.size < LOTTO_NUMBERS.LOTTO_COUNT) {
      this._numbers.add(getRandomNumber());
    }
  }

  get numbers() {
    return this._numbers;
  }

  set numbers(inputNumber) {
    inputNumber.forEach(number => this._numbers.add(number));
  }

  get numberDetailString() {
    return [...this._numbers.values()].join(', ');
  }
}
