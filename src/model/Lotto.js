import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import { LOTTO_SIZE } from '../constants/MagicNumber.js';
import validateNumberInRange from '../Validation/checkNumberInRange.js';
import validateNumber from '../Validation/checkNumber.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#lottoValidation(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }
  #lottoValidation(numbers) {
    numbers.forEach((number) => validateNumber(number));
    if (numbers.length !== LOTTO_SIZE)
      throw new Error(ERROR_MESSAGE.notSixNumbers);
    if (numbers.length !== new Set(numbers).size)
      throw new Error(ERROR_MESSAGE.duplicatedNumbers);
    validateNumberInRange(numbers);
  }
  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
