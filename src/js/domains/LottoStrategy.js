import { LOTTO } from "../constants/constants";

export default class LottoStrategy {
  pickNumbers() {
    const set = new Set();
    while (set.size < LOTTO.NUMBER_QUANTITY) {
      set.add(this.#generateRandomNumber());
    }
    return [...set];
  }

  #generateRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
    );
  }
}
