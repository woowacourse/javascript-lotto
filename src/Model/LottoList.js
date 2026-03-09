import random from "../utils/random.js";
import Lotto from "./Lotto.js";

class LottoList {
  #lottos;

  constructor(amount) {
    this.#lottos = this.#createLottoList(amount);
  }
  #createLottoList(amount) {
    const lottos = Array.from({ length: amount }).map(() => {
      return new Lotto(this.#createRandomArray());
    });

    return lottos;
  }

  #createRandomArray() {
    return random.randomArray(1, 45, 6);
  }

  getLottoList() {
    return this.#lottos;
  }
}

export default LottoList;
