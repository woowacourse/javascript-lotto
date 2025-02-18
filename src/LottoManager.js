import { PURCHASE_UNIT } from "./const";
import Lotto from "./Lotto";

class LottoManager {
  #price;
  #lottos;

  constructor(price) {
    this.#price = price;
    this.#lottos = [];
  }

  generateLottos() {
    for (let i = 0; i < this.#price / PURCHASE_UNIT; i++) {
      this.#lottos.push(new Lotto());
    }
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoManager;
