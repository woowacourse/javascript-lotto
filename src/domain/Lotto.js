import { LOTTO_RULE } from '../constant/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = new Set(numbers.sort((a, b) => a - b));
  }

  countIntersect(winningNumbers) {
    return ((LOTTO_RULE.size * 2)
      - new Set([...this.#numbers, ...winningNumbers]).size);
  }

  includes(bonusNumber) {
    return this.#numbers.has(bonusNumber);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
