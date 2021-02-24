import { LOTTO_SETTINGS } from '../utils/constants.js';

export default class Lotto {
  constructor() {
    this._numbers = [];
  }

  getNumbers() {
    return [...this._numbers];
  }

  createNumbers() {
    const numberSet = new Set();
    while (numberSet.size < LOTTO_SETTINGS.LOTTO_NUMBER_SIZE) {
      numberSet.add(this.getRandomNumber(LOTTO_SETTINGS.MIN_LOTTO_NUMBER, LOTTO_SETTINGS.MAX_LOTTO_NUMBER));
    }
    this._numbers = [...numberSet];
  }

  getRandomNumber(start, end) {
    return Math.round((1 - Math.random()) * (end - start)) + start;
  }
}
