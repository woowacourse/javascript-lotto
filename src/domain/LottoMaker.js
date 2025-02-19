import { LOTTO_CONDITION } from '../constants/constants.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMaker {
  #money;
  #lottoList;

  constructor(money) {
    this.#money = money;
    this.#lottoList = [];
  }

  getLottoCount() {
    return this.#money / LOTTO_CONDITION.PRICE;
  }

  make() {
    const count = this.getLottoCount();
    for (let i = 0; i < count; i++) {
      this.#lottoList.push(getRandomNumber());
    }
  }

  create(randomNumber) {
    return new Lotto(randomNumber);
  }

  get lottoList() {
    return this.#lottoList;
  }
}

export default LottoMaker;
