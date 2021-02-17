import { LOTTO_SETTINGS } from '../constants.js';

export default class Lotto {
  constructor() {
    this.numbers = [];
  }

  getNumbers() {
    return [...this.numbers];
  }

  createNumbers() {
    const numberSet = new Set();
    while (numberSet.size < LOTTO_SETTINGS.LOTTO_NUMBER_SIZE) {
      numberSet.add(this.getRandomNumber(LOTTO_SETTINGS.MIN_LOTTO_NUMBER, LOTTO_SETTINGS.MAX_LOTTO_NUMBER));
    }
    this.numbers = [...numberSet];
  }

  getRandomNumber(start, end) {
    return Math.round((1 - Math.random()) * (end - start)) + start;
  }
}