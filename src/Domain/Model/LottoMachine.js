import { LOTTO_DEFINITION } from '../Constant/definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';
import { makeNotDuplicatedRandomNumbers } from '../../Utils/array.js';

class LottoMachine {
  #lottoList;

  purchaseLotto(money) {
    return Math.floor(money / LOTTO_DEFINITION.PRICE_UNIT);
  }

  #makeLotto() {
    const numbers = makeNotDuplicatedRandomNumbers(
      LOTTO_DEFINITION.NUMBER_COUNTS,
      {
        min: LOTTO_DEFINITION.MIN_NUMBER,
        max: LOTTO_DEFINITION.MAX_NUMBER,
      },
    );
    return new Lotto(sortAscending(numbers));
  }

  makeLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }, () =>
      this.#makeLotto(),
    );
  }

  getLottoList() {
    return [...this.#lottoList];
  }

  getLottoNumbersList() {
    return this.#lottoList.map((lotto) => lotto.getNumbers());
  }
}

export default LottoMachine;
