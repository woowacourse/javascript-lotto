import { getRandomInt, cloneObject } from '../../utils/utils.js';
import { LOTTO } from '../../configs/contants.js';

export default class Lotto {
  static getLottoNumber() {
    return getRandomInt(LOTTO.NUMBER_RANGE.MIN, LOTTO.NUMBER_RANGE.MAX);
  }

  static getLottoNumberList() {
    return Array(LOTTO.NUMBER_LENGTH)
      .fill()
      .map(() => Lotto.getLottoNumber());
  }

  constructor() {
    this.numbers = Lotto.getLottoNumberList();

    Object.freeze(this);
  }

  getNumbers() {
    return cloneObject(this.numbers.list);
  }
}
