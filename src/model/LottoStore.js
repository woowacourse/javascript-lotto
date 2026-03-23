import Lotto from "./Lotto.js";
import { pickLottoNumbers } from "../utils.js";
import { LOTTO } from "../constant/index.js";

class LottoStore {
  #pickLottoNumbers;

  constructor(randomLottoNumberGenerator) {
    this.#pickLottoNumbers =
      randomLottoNumberGenerator ?? (() => pickLottoNumbers());
  }

  issuedLottos(amount) {
    const count = amount / LOTTO.PRICE;
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const lotto = new Lotto(this.#pickLottoNumbers());
      lottos.push(lotto);
    }

    return lottos;
  }
}

export default LottoStore;
