import { LOTTO } from "../constants/constants.js";
export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  pickNumbers(strategy = this.#generateRandomNumber) {
    const set = new Set();
    while (set.size < LOTTO.NUMBER_QUANTITY) {
      set.add(strategy());
    }
    this.#numbers = [...set];
  }

  #generateRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
    );
  }
}
