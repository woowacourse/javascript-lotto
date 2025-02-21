import { LOTTO_LENGTH, LOTTO_PRICE, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../lib/constants.js';
import { generateUniqueNumbers } from '../lib/utils.js';
import Lotto from './Lotto.js';

class LottoShop {
  static calculateLottoCount(purchaseAmount) {
    return Math.floor(purchaseAmount / LOTTO_PRICE);
  }

  static createLotto(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => new Lotto(LottoShop.#createLottoNumber()));
  }

  static #createLottoNumber() {
    return generateUniqueNumbers({ start: MIN_LOTTO_NUMBER, end: MAX_LOTTO_NUMBER }, LOTTO_LENGTH);
  }
}

export default LottoShop;
