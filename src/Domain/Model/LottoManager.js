import { LOTTO_DEFINITION } from '../Constant/Definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';

class LottoManager {
  #lottoList;

  constructor() {}

  purchaseLotto(money) {
    return money / LOTTO_DEFINITION.ONE_PRICE;
  }
  makeLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }, () => {
      const sortedNumbers = sortAscending([6, 5, 4, 3, 2, 1]);
      new Lotto(sortedNumbers);
    });
  }
  getLottoList() {
    return this.#lottoList;
  }
}

export default LottoManager;
