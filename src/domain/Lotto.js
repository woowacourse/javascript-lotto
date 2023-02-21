import { isValidLottoNumbers, isDuplicateNumbers } from '../validation';
import { ERROR_INVALID, ERROR_DUPLICATE } from '../util/constants';

class Lotto {
  #numbers = [];

  constructor(numbers) {
    if (!isValidLottoNumbers(numbers)) {
      throw new Error(ERROR_INVALID);
    }
    if (isDuplicateNumbers(numbers)) {
      throw new Error(ERROR_DUPLICATE);
    }

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }

  hasBonus(bonusBall) {
    return this.#numbers.includes(bonusBall);
  }

  countMatch(other) {
    const matchNumbers = this.#numbers.filter((number) => {
      return other.#numbers.includes(number);
    });

    return matchNumbers.length;
  }
}

export default Lotto;
