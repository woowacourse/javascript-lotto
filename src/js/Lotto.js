import { getRandomNumber } from './utils/utils.js';
import { LOTTO_NUMBERS } from './utils/constants.js';
export default class Lotto {
  static LOTT0_LENGTH = 6;

  constructor(numbers) {
    this._numbers = new Set(numbers) || new Set();
  }

  initRandomNumbers() {
    while (this._numbers.size < Lotto.LOTT0_LENGTH) {
      this._numbers.add(getRandomNumber(1, LOTTO_NUMBERS.LOTTO_MAX_NUM));
    }
  }

  get numbers() {
    return this._numbers;
  }

  get numberDetail() {
    return [...this._numbers.values()].join(', ');
  }
}
