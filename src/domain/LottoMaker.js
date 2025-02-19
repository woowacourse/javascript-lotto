import { LOTTO_CONDITION } from '../constants/constants.js';

class LottoMaker {
  #money;

  constructor(money) {
    this.#money = money;
  }

  getLottoCount() {
    return this.#money / LOTTO_CONDITION.PRICE;
  }
}

export default LottoMaker;
