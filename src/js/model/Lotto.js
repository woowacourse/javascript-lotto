import generateRandomNumbers from '../utils/random.js';
import LOTTO from '../constants/lotto.js';

export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  set numbers(newNumbers) {
    this.#numbers = newNumbers;
  }

  generateLottoNumbers() {
    this.#numbers = generateRandomNumbers({
      count: LOTTO.NUMBER_COUNT,
      max: LOTTO.MAX_NUMBER,
      min: LOTTO.MIN_NUMBER,
    });
  }
}
