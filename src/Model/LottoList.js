import Random from "../utils/Random.js";
import Lotto from "./Lotto.js";

class LottoList {
  #lottos;
  #amount;

  constructor(amount) {
    this.#amount = amount;
    this.#lottos = this.#createLottoList(amount);
  }
  #createLottoList(amount) {
    const lottos = Array.from({ length: amount }).map(() => {
      return new Lotto(this.#createRandomArray());
    });

    return lottos;
  }

  #createRandomArray() {
    return Random.randomArray(1, 45, 6);
  }

  getLottoList() {
    return this.#lottos;
  }
}

export default LottoList;
