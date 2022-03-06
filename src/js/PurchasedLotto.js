import Lotto from './Lotto';
import { createRandomNumberList } from './util/utils';

export default class PurchasedLotto {
  #lottoList;

  constructor() {
    this.#lottoList = [];
  }

  setPurchasedLotto(count) {
    for (let i = 0; i < count; i++) {
      const lotto = new Lotto();
      lotto.setLotto(createRandomNumberList());
      this.#lottoList.push(lotto.getLotto());
    }
  }

  getPurchasedLotto() {
    return this.#lottoList;
  }

  count() {
    return this.#lottoList.length;
  }
}
