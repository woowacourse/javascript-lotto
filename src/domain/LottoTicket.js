import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAX_LOTTO_LENGTH,
  PURCHASE_UNIT,
} from "../config/const.js";
import Lotto from "./Lotto.js";

class LottoTicket {
  #lottos;

  constructor(price) {
    this.#lottos = this.#generateLottos(price);
  }

  #getRandomNumbers() {
    let randomNumbers = new Set();
    while (randomNumbers.size < MAX_LOTTO_LENGTH) {
      randomNumbers.add(
        Math.floor(Math.random() * LOTTO_MAX_RANGE) + LOTTO_MIN_RANGE
      );
    }
    return [...randomNumbers];
  }

  #generateLottos(price) {
    return Array.from({ length: price / PURCHASE_UNIT }).reduce((acc) => {
      const randomNumbers = this.#getRandomNumbers();
      acc.push(new Lotto(randomNumbers));
      return acc;
    }, []);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoTicket;
