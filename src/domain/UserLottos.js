import { PURCHASE_UNIT } from "../config/const.js";
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
    while (randomNumbers.size < 6) {
      randomNumbers.add(Math.floor(Math.random() * 45) + 1);
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
