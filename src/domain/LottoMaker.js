import { LOTTO_CONDITION } from '../constants/constants.js';
import { generateLottoNumbers } from '../utils/getRandomNumber.js';

class LottoMaker {
  #money;

  constructor(money) {
    this.#money = money;
  }

  getLottoCount() {
    return this.#money / LOTTO_CONDITION.PRICE;
  }

  make() {}
}

export default LottoMaker;
