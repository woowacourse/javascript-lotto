import Validator from '../EventListener/Validator.js';
import ValidationError from './ValidationError.js';
import { LOTTO_PRICE, LOTTO_RULES, ERROR_MESSAGE } from '../constant/index.js';

const checkFunctions = {
  isLackFare(fare) {
    return fare < LOTTO_PRICE;
  },
  isNotNumber(numbers) {
    return numbers.some((number) => !/^\d+$/.test(number));
  },
  overlappedNumber(numbers) {
    return new Set(numbers).size < numbers.length;
  },
  outedOfLottoNumberRange(numbers) {
    return numbers.some(
      (number) => number < LOTTO_RULES.MIN_RANGE || number > LOTTO_RULES.MAX_RANGE,
    );
  },
  emptyNumbers(numbers) {
    return numbers.some((number) => number === '');
  },
};

export default class ValidatorImpl extends Validator {
  constructor() {
    super();
    this.checkFunctions = checkFunctions;
  }

  validateFare(fare) {
    if (this.checkFunctions.isLackFare(fare)) {
      throw new ValidationError(ERROR_MESSAGE.LACK_OF_FARE);
    }
  }
}
