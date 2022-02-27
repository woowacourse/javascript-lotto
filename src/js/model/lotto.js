import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE } from '../constants/constants';
import { generateRandomNumberInRange } from '../utils/utils';

class Lotto {
  constructor() {
    this.lottoNumberSet = this.#generateNumbers();
  }

  #generateNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size !== LOTTO_NUMBER_COUNT) {
      lottoNumberSet.add(
        generateRandomNumberInRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX)
      );
    }
    return lottoNumberSet;
  }
}

export default Lotto;
