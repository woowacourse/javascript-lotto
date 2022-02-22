import { LOTTO } from "../constants/constants.js";
export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  set numbers(numbers) {
    this.#numbers = numbers;
  }

  generateNumbers(generateRandomNumber) {
    const set = new Set();
    while (set.size < LOTTO.NUMBER_QUANTITY) {
      set.add(generateRandomNumber());
    }
    return [...set];
  }

  generateRandomNumberNotInNumbers(generateRandomNumber) {
    const randomNumber = generateRandomNumber();
    if (this.#numbers.every((item) => item !== randomNumber)) {
      return randomNumber;
    }
  }

  generateRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
    );
  }
}
