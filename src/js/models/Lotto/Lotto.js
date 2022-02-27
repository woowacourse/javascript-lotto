import { getRandomList } from '../../utils/utils.js';
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
    return getRandomList(
      LOTTO.NUMBER_LENGTH,
      LOTTO.NUMBER_RANGE.MIN,
      LOTTO.NUMBER_RANGE.MAX
    );
  }
}
