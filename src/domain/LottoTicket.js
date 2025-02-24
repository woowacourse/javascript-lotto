import { LOTTO } from "../config/const.js";
import Lotto from "./Lotto.js";

class LottoTicket {
  #lottos;

  constructor(price) {
    this.#lottos = this.#generateLottos(price);
  }

  #generateRandomNumber() {
    return Math.floor(Math.random() * LOTTO.RANGE.max) + LOTTO.RANGE.min;
  }

  #getRandomNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.maxLength) {
      randomNumbers.add(this.#generateRandomNumber());
    }
    return [...randomNumbers];
  }

  #generateLottos(price) {
    return Array.from({ length: price / LOTTO.PURCHASE.unit }).reduce((acc) => {
      acc.push(new Lotto(this.#getRandomNumbers()));
      return acc;
    }, []);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoTicket;
