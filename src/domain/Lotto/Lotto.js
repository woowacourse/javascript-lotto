import { sortByAscending } from '../../utils/array.js';
import Random from '../../utils/random.js';

class Lotto {
  static LOTTO_DETAILS = {
    min: 1,
    max: 45,
    count: 6,
  };

  static from() {
    return new Lotto();
  }

  createNumber() {
    const lottoNumber = Random.pickUniqueNumbersInRange({
      start: Lotto.LOTTO_DETAILS.min,
      end: Lotto.LOTTO_DETAILS.max,
      count: Lotto.LOTTO_DETAILS.count,
    });

    return sortByAscending(lottoNumber);
  }
}

export default Lotto;
