import { LOTTO } from "../config/const.js";
import Lotto from "./Lotto.js";

class LottoTicket {
  #lottos;

  constructor(price) {
    this.#lottos = this.#generateLottos(price);
  }

  #getRandomNumbers() {
    let randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.maxLength) {
      randomNumbers.add(
        Math.floor(Math.random() * LOTTO.RANGE.max) + LOTTO.RANGE.min
      );
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
