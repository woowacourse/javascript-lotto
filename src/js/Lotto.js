import { LOTTO_NUMBER } from './constants/constants';
import { generateRandomInRange } from './utils/util';

export default class Lotto {
  #numbers;

  constructor() {
    const pickNewNumbers = new Set();

    while (pickNewNumbers.size !== LOTTO_NUMBER.LENGTH) {
      const randomNumber = generateRandomInRange(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX);
      pickNewNumbers.add(randomNumber);
    }

    this.#numbers = pickNewNumbers;
  }

  get numbers() {
    return this.#numbers;
  }
}
