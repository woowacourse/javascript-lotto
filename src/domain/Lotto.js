import { getIntersectCount } from '../lib/utils.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  calculateMatchWinning(winNumbers) {
    return getIntersectCount(this.#numbers, winNumbers);
  }

  includes(bonusNumbers) {
    return this.#numbers.includes(bonusNumbers);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
