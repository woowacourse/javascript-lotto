import { sortByAscending } from '../../utils/array.js';
import Random from '../../utils/random.js';

class Lotto {
  static LOTTO_RULE = {
    min: 1,
    max: 45,
    count: 6,
  };

  static from() {
    return new Lotto();
  }

  createNumber() {
    const lottoNumber = Random.pickUniqueNumbersInRange({
      start: Lotto.LOTTO_RULE.min,
      end: Lotto.LOTTO_RULE.max,
      count: Lotto.LOTTO_RULE.count,
    });

    return sortByAscending(lottoNumber);
  }
}

export default Lotto;
