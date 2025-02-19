import {
  LOTTO_LENGTH,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../lib/constants.js";
import { generateUniqueNumberArray } from "../lib/utils.js";
import Lotto from "./Lotto.js";

class LottoShop {
  static createLotto(purchaseCount) {
    return Array.from(
      { length: purchaseCount },
      () => new Lotto(this.#createLottoNumber())
    );
  }

  static #createLottoNumber() {
    return generateUniqueNumberArray(
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
      LOTTO_LENGTH
    );
  }
}

export default LottoShop;
