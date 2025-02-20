import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import systemSettings from '../settings/systemSettings.js';
import validateNumberInRange from '../Validation/validateNumberInRange.js';
import validateNumber from '../Validation/validateNumber.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#lottoValidation(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }
  #lottoValidation(numbers) {
    numbers.forEach((number) => validateNumber(number));
    if (numbers.length !== systemSettings.lottoSize)
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
