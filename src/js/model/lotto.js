import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE } from '../constants/constants';
import { generateRandomNumberInRange } from '../utils/utils';

class Lotto {
  constructor() {
    this.lottoNumberSet = new Set(
      generateRandomNumberInRange({
        min: LOTTO_NUMBER_RANGE.MIN,
        max: LOTTO_NUMBER_RANGE.MAX,
        count: LOTTO_NUMBER_COUNT,
      })
    );
  }
}

export default Lotto;
