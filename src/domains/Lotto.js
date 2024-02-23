import { ERROR_MESSAGE } from '../constants';
import {
  isIntegers,
  isLottoNumbersInRange,
  isValidLottoNumberCount,
} from '../utils';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);

    this.#numbers = numbers;
  }

  get numbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  #validateNumbers(numbers = []) {
    if (!isLottoNumbersInRange(numbers))
      throw Error(ERROR_MESSAGE.invalidLottoNumberRange);

    if (!isIntegers(numbers)) throw Error(ERROR_MESSAGE.notInteger);

    if (!isValidLottoNumberCount(numbers))
      throw Error(ERROR_MESSAGE.invalidLottoNumberCount);
  }
}

export default Lotto;
