import { getRandomList } from '../../utils/utils.js';
import { LOTTO } from '../../configs/contants.js';

export default class Lotto {
  constructor() {
    this.numbers = this.getLottoNumbers();
  }

  getNumbers() {
    return this.numbers;
  }

  getLottoNumbers() {
    return getRandomList(
      LOTTO.NUMBER_LENGTH,
      LOTTO.NUMBER_RANGE.MIN,
      LOTTO.NUMBER_RANGE.MAX
    );
  }
}
