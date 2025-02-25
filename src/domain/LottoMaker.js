import { LOTTO_CONDITION } from '../constants/constants.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMaker {
  #lottoList;

  constructor(purchaseMoney) {
    const purchaseCount = LottoMaker.calculatePurchaseCount(purchaseMoney);
    this.#lottoList = this.purchase(purchaseCount);
  }

  static calculatePurchaseCount(purchaseMoney) {
    return Math.floor(purchaseMoney / LOTTO_CONDITION.PRICE);
  }

  purchase(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => this.create(getRandomNumber()));
  }

  create(randomNumber) {
    return new Lotto(randomNumber);
  }

  get lottoList() {
    return [...this.#lottoList];
  }
}

export default LottoMaker;
