import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../data/constants.js';
import Validator from '../utils/Validator.js';

class Lotto {
  _numbers;

  constructor(numbers) {
    this.validateNumbers(numbers);
    this._numbers = numbers;
  }

  get _numbers() {
    return this._numbers;
  }

  validateNumbers(numbers) {
    numbers.forEach((number) => {
      this.validateEachNumber(number);
    });
    if (Validator.isDuplicated(numbers))
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_CONSTANT.LOTTO_NUMBER));
    if (numbers.length !== LOTTO_CONSTANT.LENGTH) throw new Error(ERROR_MESSAGE.LOTTO_LENGTH_LIMIT);
  }

  validateEachNumber(number) {
    if (!Validator.isInteger(number))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.LOTTO_NUMBER));
    if (LOTTO_CONSTANT.MIN_NUMBER > number || LOTTO_CONSTANT.MAX_NUMBER < number)
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_CONSTANT.LOTTO_NUMBER));
  }

  includes(number) {
    return this._numbers.includes(number);
  }
}

export default Lotto;
