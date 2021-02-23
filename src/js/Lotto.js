import { getRandomNumber } from './utils/utils.js';

export default class Lotto {
  static LOTT0_LENGTH = 6;

  constructor() {
    this.numbers = new Set();
    this.initNumbers();
  }

  initNumbers() {
    while (this.numbers.size < Lotto.LOTT0_LENGTH) {
      this.numbers.add(getRandomNumber());
    }
  }

  get numberDetail() {
    return [...this.numbers.values()].join(', ');
  }
}
