import { LOTTO } from '../constants/constants';

export default class LottoStrategy {
  pickNumbers() {
    return Array(LOTTO.MAX_NUMBER)
      .fill()
      .map((_, idx) => idx + 1)
      .sort(this.#shuffle)
      .slice(0, LOTTO.NUMBER_QUANTITY);
  }

  #shuffle() {
    return Math.random() - 0.5;
  }
}
