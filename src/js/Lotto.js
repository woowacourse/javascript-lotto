import { NUMBERS } from './utils/constants.js';
import getRandomNumber from './utils/utils.js';

export default class Lotto {
  constructor() {
    this._numbers = new Set();
  }

  initNumbers() {
    while (this._numbers.size < NUMBERS.LOTT0_LENGTH) {
      this._numbers.add(getRandomNumber());
    }
  }

  get numberDetail() {
    return [...this._numbers.values()].join(', ');
  }
}
