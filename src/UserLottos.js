import { PURCHASE_UNIT } from "./const";
import Lotto from "./Lotto";

class UserLottos {
  #price;
  #lottos;

  constructor(price) {
    this.#price = price;
    this.#lottos = [];
  }

  #getRandomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      randomNumbers.push(Math.floor(Math.random() * 45) + 1);
    }
    return randomNumbers;
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
}

export default UserLottos;
