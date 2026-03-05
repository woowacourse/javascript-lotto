import ERROR_MESSAGE from "./constants/errorMessage.js";
import Lotto from "./Lotto.js";
import { generateRandomNumber } from "./utils.js";

class LottoStore {
  static purchaseLottos(amount) {
    if (amount % Lotto.UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.AMOUNT.UNIT);
    }

    const lottoCount = amount / Lotto.UNIT;
    const result = Array.from({ length: lottoCount }).map(() =>
      LottoStore.createRandomLotto(),
    );

    return result;
  }

  static createRandomLotto() {
    const numbers = Array.from({ length: Lotto.LENGTH }).map(() =>
      generateRandomNumber(Lotto.MAX),
    );
    return new Lotto(numbers);
  }
}

export default LottoStore;
