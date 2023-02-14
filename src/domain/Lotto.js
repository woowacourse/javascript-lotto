import { ERROR_MESSAGE } from '../data/constants';
import Validator from '../utils/Validator';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateNumbers(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  validateNumbers(numbers) {
    numbers.forEach((number) => {
      if (!Validator.isInteger(number))
        throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_TYPE);
      if (1 > number || 45 < number)
        throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE);
    });
    if (Validator.isDuplicated(numbers))
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE);
  }
}

export default Lotto;
