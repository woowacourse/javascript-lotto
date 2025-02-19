import { LOTTO_DEFINITION } from '../Constant/Definition.js';
import Lotto from './Lotto.js';

class LottoManager {
  #lottoList;

  constructor() {}

  purchaseLotto(money) {
    return money / LOTTO_DEFINITION.ONE_PRICE;
  }
  makeLottoList(lottoCount) {
    this.#lottoList = Array.from(
      { length: lottoCount },
      () => new Lotto([1, 2, 3, 4, 5, 6])
    );
  }
  getLottoList() {
    return this.#lottoList;
  }
}

export default LottoManager;
