import ERROR_MESSAGE from "../constants/errorMessage.js";
import LOTTO from "../constants/lotto.js";
import Lotto from "./Lotto.js";
import { generateUniqueRandomNumbers } from "../utils.js";

class LottoStore {
  static purchaseLottos(amount) {
    if (Number.isNaN(amount) || amount <= 0) {
      throw new Error(ERROR_MESSAGE.AMOUNT.POSITIVE);
    }

    if (amount % LOTTO.UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.AMOUNT.UNIT);
    }

    const lottoCount = amount / LOTTO.UNIT;
    const result = Array.from({ length: lottoCount }).map(() =>
      LottoStore.createRandomLotto(),
    );

    return result;
  }

  static createRandomLotto() {
    const numbers = generateUniqueRandomNumbers(LOTTO.MAX, LOTTO.LENGTH);
    return new Lotto(numbers);
  }
}

export default LottoStore;
