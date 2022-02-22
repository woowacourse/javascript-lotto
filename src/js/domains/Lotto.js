<<<<<<< HEAD
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
=======
const LOTTO_MAX_NUMBER = 45;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_NUMBER_QUANTITY = 6;

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
    while (set.size < LOTTO_NUMBER_QUANTITY) {
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
      Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER) + LOTTO_MIN_NUMBER
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
    );
  }
}
