import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE } from '../constants/constants';
import { generateRandomNumberInRange } from '../utils/utils';

class Lotto {
  constructor() {
    this.lottoNumberSet = new Set();
    this.#generateNumbers();
  }

  #generateNumbers() {
    while (this.lottoNumberSet.size !== LOTTO_NUMBER_COUNT) {
      this.lottoNumberSet.add(
        generateRandomNumberInRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX)
      );
    }
  }
}

export default Lotto;
