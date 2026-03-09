import { LOTTO_RANGE } from "../constants/constant.js";

class Lotto {
  #number;

  constructor() {
    this.#getRandomLotto();
  }
  #getRandomLotto() {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO_RANGE.COUNT) {
      lottoSet.add(
        Math.floor(Math.random() * LOTTO_RANGE.MAX + LOTTO_RANGE.MIN),
      );
    }

    const lottoArray = Array.from(lottoSet);
    lottoArray.sort((a, b) => a - b);

    this.#number = lottoArray;
  }
  getNumber() {
    return [...this.#number];
  }
}

export default Lotto;
