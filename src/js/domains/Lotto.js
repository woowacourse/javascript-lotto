<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { LOTTO } from "../constants/constants.js";
=======
import { LOTTO } from '../constants/constants.js';
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
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

=======
import { LOTTO } from "../constants/constants.js";
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
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
<<<<<<< HEAD
      Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER) + LOTTO_MIN_NUMBER
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
=======
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
    );
  }
}
