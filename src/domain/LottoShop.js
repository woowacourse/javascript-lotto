//@ts-check
import { LOTTO_LENGTH, LOTTO_PRICE, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../lib/constants.js';
import { generateUniqueNumbers } from '../util/lotto.js';
import Lotto from './Lotto.js';

class LottoShop {
  static purchaseLotto(purchaseAmount) {
    const purchaseCount = purchaseAmount / LOTTO_PRICE;
    return new Array(purchaseCount).fill(null).map(() => new Lotto(this.#createLottoNumber()));
  }

  static #createLottoNumber() {
    return generateUniqueNumbers({ start: MIN_LOTTO_NUMBER, end: MAX_LOTTO_NUMBER }, LOTTO_LENGTH);
  }
}

export default LottoShop;
