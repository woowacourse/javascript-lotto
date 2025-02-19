import { LOTTO_CONDITION } from '../constants/constants.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMaker {
  #purchaseCount;
  #lottoList;

  constructor(money) {
    this.calculateLottoCount(money)
    this.#lottoList = [];
    this.purchase()
  }

  calculateLottoCount(money) {
    this.#purchaseCount = money / LOTTO_CONDITION.PRICE;
  }

  purchase() {
    this.#lottoList = Array.from({ length: this.#purchaseCount }, () => this.create(getRandomNumber()));
  }

  create(randomNumber) {
    return new Lotto(randomNumber);
  }

  get purchaseCount(){
    return this.#purchaseCount;
  }

  get lottoList() {
    return this.#lottoList;
  }
}

export default LottoMaker;
