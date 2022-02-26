import { getRandomInt } from '../../utils/utils.js';
import { LOTTO } from '../../configs/contants.js';

export default class Lotto {
  constructor() {
    this.numbers = this.getLottoNumberList();
    Object.freeze(this);
  }

  getNumbers() {
    return this.numbers;
  }

  getLottoNumberList() {
    return Array(LOTTO.NUMBER_LENGTH)
      .fill()
      .map(() => this.getLottoNumber());
  }

  getLottoNumber() {
    return getRandomInt(LOTTO.NUMBER_RANGE.MIN, LOTTO.NUMBER_RANGE.MAX);
  }
}
