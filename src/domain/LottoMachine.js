import {
  LOTTO_NUMBER_LENGTH,
  LOTTO_NUMBER_RANGE,
  LOTTO_PRICE,
} from "../constants/lotto-constants.js";
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
            start: LOTTO_NUMBER_RANGE.MIN,
            end: LOTTO_NUMBER_RANGE.MAX,
            count: LOTTO_NUMBER_LENGTH,
          }),
        ),
    );
    return lottoList;
  }
}
export default LottoMachine;
