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
    let randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.maxLength) {
      randomNumbers.add(this.#generateRandomNumber());
    }
    return [...randomNumbers];
  }

  #generateLottos(price) {
    return Array.from({ length: price / LOTTO.PURCHASE.unit }).reduce((acc) => {
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
