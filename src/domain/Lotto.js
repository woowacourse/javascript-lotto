import { validateLottoNumbers } from '../validation/validateLottoNumbers.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    validateLottoNumbers(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  includes(number) {
    return this.#numbers.includes(number);
  }

  getMatchingCount(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }
}

export default Lotto;
