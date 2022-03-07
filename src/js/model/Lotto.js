import LOTTO from '../constants/lotto.js';
import random from '../utils/random.js';

export default class Lotto {
  #numbers = [];

  get numbers() {
    return this.#numbers;
  }

  generateLottoNumbers() {
    this.#numbers = random.generateRandomNumbers({
      count: LOTTO.NUMBER_COUNT,
      max: LOTTO.MAX_NUMBER,
      min: LOTTO.MIN_NUMBER,
    });
  }
}
