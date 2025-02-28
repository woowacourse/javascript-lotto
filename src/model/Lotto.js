import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import { LOTTO_SIZE } from '../constants/MagicNumber.js';
import checkNumberInRange from '../Validation/checkNumberInRange.js';
import checkNumber from '../Validation/checkNumber.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#lottoValidation(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }
  #lottoValidation(numbers) {
    numbers.forEach((number) => checkNumber(number));
    if (numbers.length !== LOTTO_SIZE)
      throw new Error(ERROR_MESSAGE.notSixNumbers);
    if (numbers.length !== new Set(numbers).size)
      throw new Error(ERROR_MESSAGE.duplicatedNumbers);
    checkNumberInRange(numbers);
  }
  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
