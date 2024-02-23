import { LOTTO_LENGTH, LOTTO_RANGE } from "../constants/option.js";
import { LOTTO_PRICE } from "../constants/system.js";
import createUniqueNumbersInRange from "../utils/createUniqueNumbersInRange.js";

import Lotto from "./Lotto.js";

class LottoMachine {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  makeLottos() {
    const lottoCount = this.#purchaseAmount / LOTTO_PRICE;

    const lottoList = Array.from(
      { length: lottoCount },
      () =>
        new Lotto(
          createUniqueNumbersInRange({
            start: LOTTO_RANGE.MIN,
            end: LOTTO_RANGE.MAX,
            count: LOTTO_LENGTH,
          }),
        ),
    );

    return lottoList;
  }
}
export default LottoMachine;
