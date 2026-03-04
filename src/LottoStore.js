import Lotto from "./Lotto.js";
import { generateRandomNumber } from "./utils.js";

class LottoStore {
  static purchaseLottos(amount) {
    if (amount % Lotto.UNIT !== 0) {
      throw new Error();
    }

    const lottoCount = amount / Lotto.UNIT;
    const result = Array.from({ length: lottoCount }).map(() =>
      LottoStore.createRandomLotto(),
    );

    return result;
  }

  static createRandomLotto() {
    const numbers = Array.from({ length: 6 }).map(() => generateRandomNumber());
    return new Lotto(numbers);
  }
}

export default LottoStore;
