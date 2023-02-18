import { LOTTO_COUNT_STANDARD, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from './constant/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    if (numbers.every((number) => typeof number !== number || Number.isNaN(number))) {
      throw new Error('[ERROR] ');
    }

    if (numbers.every((number) => number > LOTTO_MAX_NUMBER || number < LOTTO_MIN_NUMBER)) {
      throw new Error('[ERROR] ');
    }

    if (numbers.length !== LOTTO_COUNT_STANDARD) {
      throw new Error('[ERROR] ');
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error('[ERROR] ');
    }

    this.#numbers = new Set(numbers);
  }

  countIntersect(winningNumbers) {
    return LOTTO_RULE.size * 2 - new Set([...this.#numbers, ...winningNumbers]).size;
  }

  includes(bonusNumber) {
    return this.#numbers.has(bonusNumber);
  }

  getNumbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }
}

export default Lotto;
