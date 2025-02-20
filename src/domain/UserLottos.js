import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAX_LOTTO_LENGTH,
  PURCHASE_UNIT,
} from "../config/const.js";
import Lotto from "./Lotto.js";

class UserLottos {
  #price;
  #lottos;

  constructor(price) {
    this.#price = price;
    this.#lottos = [];
    this.generateLottos();
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

  generateLottos() {
    for (let i = 0; i < this.#price / PURCHASE_UNIT; i++) {
      const randomNumbers = this.#getRandomNumbers();
      this.#lottos.push(new Lotto(randomNumbers));
    }
  }

  get lottos() {
    return this.#lottos;
  }

  get price() {
    return this.#price;
  }
}

export default UserLottos;
