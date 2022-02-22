import { getValues } from '../utils.js';
import { CONDITIONS } from '../constants/constants.js';

export class Lotto {
  constructor() {
    this.numbers = [];
    this.makeNumbers();
  }

  makeNumbers() {
    const temp = new Set();
    while (temp.size < CONDITIONS.LOTTO_SIZE) {
      temp.add(getValues.randomInt(CONDITIONS.LOTTO_NUM_MIN, CONDITIONS.LOTTO_NUM_MAX));
    }
    this.numbers = Array.from(temp);
  }
}
