import { LOTTO_DEFINITION } from '../Constant/Definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';
import { makeNotDuplicatedRandomNumbers } from '../../Utils/math.js';

class LottoManager {
  #lottoList;

  constructor() {}

  purchaseLotto(money) {
    return money / LOTTO_DEFINITION.ONE_PRICE;
  }
  makeLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }, () => {
      const sortedNumbers = sortAscending(
        makeNotDuplicatedRandomNumbers(LOTTO_DEFINITION.NUMBER_COUNTS, {
          min: LOTTO_DEFINITION.MIN_NUMBER,
          max: LOTTO_DEFINITION.MAX_NUMBER,
        })
      );
      new Lotto(sortedNumbers);
    });
  }
  getLottoList() {
    return this.#lottoList;
  }
}

export default LottoManager;
