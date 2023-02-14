import { ERROR_MESSAGE, LOTTO_STRING } from '../data/constants';
import Validator from '../utils/Validator';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateNumbers(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }

  validateNumbers(numbers) {
    numbers.forEach((number) => {
      if (!Validator.isInteger(number))
        throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_STRING.LOTTO_NUMBER));
      if (1 > number || 45 < number)
        throw new Error(
          ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_STRING.LOTTO_NUMBER)
        );
    });
    if (Validator.isDuplicated(numbers))
      throw new Error(
        ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_STRING.LOTTO_NUMBER)
      );
  }
}

export default Lotto;
