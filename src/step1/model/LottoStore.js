import Lotto from "./Lotto.js";
import RandomUtil from "../util/RandomUtil.js";
import { LOTTO } from "../constant/index.js";

class LottoStore {
  #randomUtil;

  constructor({ randomUtil } = {}) {
    this.#randomUtil = randomUtil ?? new RandomUtil();
  }

  issuedLottos(amount) {
    const count = amount / LOTTO.PRICE;
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const lotto = new Lotto(this.#randomUtil.pickUniqSixNumbers());
      lottos.push(lotto);
    }

    return lottos;
  }
}

export default LottoStore;
