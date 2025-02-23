import { LOTTO_DEFINITION } from '../Constant/definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';
import { makeNotDuplicatedRandomNumbers } from '../../Utils/math.js';

class LottoMachine {
  #lottoList;

  purchaseLotto(money) {
    return Math.floor(money / LOTTO_DEFINITION.ONE_PRICE);
  }

  makeLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }, () => {
      const numbers = makeNotDuplicatedRandomNumbers(
        LOTTO_DEFINITION.NUMBER_COUNTS,
        {
          min: LOTTO_DEFINITION.MIN_NUMBER,
          max: LOTTO_DEFINITION.MAX_NUMBER,
        },
      );
      sortAscending(numbers);
      return new Lotto(numbers);
    });
  }

  getLottoList() {
    return [...this.#lottoList];
  }

  getLottoNumbersList() {
    return this.#lottoList.map((lotto) => lotto.getNumbers());
  }
}

export default LottoMachine;
