import { LOTTO_LENGTH, LOTTO_PRICE, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../lib/constants.js';
import { generateUniqueNumberArray } from '../lib/utils.js';
import Lotto from './Lotto.js';

class LottoShop {
  static createLotto(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => new Lotto(this.#createLottoNumber()));
  }

  static #createLottoNumber() {
    return generateUniqueNumberArray(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER, LOTTO_LENGTH);
  }

  static calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO_PRICE;
  }
}

export default LottoShop;
