import { LOTTO, MIN_MATCH_COUNT } from "../config/const.js";
import Lotto from "./Lotto.js";

class LottoManager {
  static #generateRandomNumber() {
    return Math.floor(Math.random() * LOTTO.RANGE.max) + LOTTO.RANGE.min;
  }

  static #getRandomNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.maxLength) {
      randomNumbers.add(this.#generateRandomNumber());
    }
    return [...randomNumbers];
  }

  static generateLottos(price) {
    return Array.from(
      { length: price / LOTTO.PURCHASE.unit },
      () => new Lotto(this.#getRandomNumbers())
    );
  }
}

export default LottoManager;
