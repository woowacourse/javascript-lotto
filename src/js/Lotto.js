import { NUMBERS } from './utils/constants.js';

export default class Lotto {
  constructor() {
    this._numbers = new Set();
  }

  getRandomNumber() {
    return Math.floor(Math.random() * NUMBERS.LOTTO_MAX_NUM) + 1;
  }

  initNumbers() {
    while (this._numbers.size < NUMBERS.LOTT0_LENGTH) {
      this._numbers.add(this.getRandomNumber());
    }
  }

  get numbers() {
    return this._numbers;
  }
}
