import { LOTTO_LENGTH, LOTTO_RANGE } from "../constants/option.js";
import { LOTTO_PRICE } from "../constants/system.js";

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
      () => new Lotto(this.#generateLotto()),
    );

    return lottoList;
  }

  #generateLotto() {
    const range = Array.from({ length: LOTTO_RANGE.MAX }, (_, i) => i + 1);
    const shuffled = range
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, LOTTO_LENGTH);

    return shuffled;
  }
}
export default LottoMachine;
