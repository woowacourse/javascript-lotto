import Validator from '../EventListener/Validator.js';
import ValidationError from '../ValidationError/index.js';
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

  validateWinningNumber(winningNumber) {
    if (this.checkFunctions.isNotNumber(winningNumber)) {
      throw new ValidationError(ERROR_MESSAGE.WINNING_NUMBER_IS_NOT_NUMBER);
    }
    if (this.checkFunctions.overlappedNumber(winningNumber)) {
      throw new ValidationError(ERROR_MESSAGE.OVERLAPPED_WINNING_NUMBER);
    }
    if (this.checkFunctions.outedOfLottoNumberRange(winningNumber)) {
      throw new ValidationError(ERROR_MESSAGE.OUT_OF_RANGE_WINNING_NUMBER);
    }
  }
}
