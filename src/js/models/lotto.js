import LOTTO from "../constants/lotto.js";
import { generateRandomNumber, sortByNumber } from "../util.js";

class Lotto {
  #_numbers;

  constructor() {
    this.#_numbers = [];
  }

  get numbers() {
    return this.#_numbers;
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== LOTTO.SIZE) {
      lotto.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    this.#_numbers = sortByNumber([...lotto]);
  }
}

export default Lotto;
