import { LOTTO_NUMBER } from './constants/constants';
import { generateRandomInRange } from './utils/util';

export default class Lotto {
  #numbers;

  constructor() {
    this.#numbers = this.generateNumbersAutomatically();
  }

  get numbers() {
    return this.#numbers;
  }

  generateNumbersAutomatically() {
    const numbers = [];

    while (numbers.length !== LOTTO_NUMBER.LENGTH) {
      const randomNumber = generateRandomInRange(
        LOTTO_NUMBER.MIN,
        LOTTO_NUMBER.MAX
      );
      if (!numbers.find(number => number === randomNumber))
        numbers.push(randomNumber);
    }

    return numbers;
  }
}
