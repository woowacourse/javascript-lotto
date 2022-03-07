import Validator from '../EventListener/Validator.js';
import ValidationError from '../ValidationError/index.js';
import { LOTTO_PRICE, LOTTO_RULES, ERROR_MESSAGE } from '../constant/index.js';
import { isEmpty, isNotNumber, isOutOfRanged } from '../utils/index.js';

const checkFunctions = {
  isLackFare(fare) {
    return fare < LOTTO_PRICE;
  },
  isNotNumbers(numbers) {
    return numbers.some(isNotNumber);
  },
  overlappedNumber(numbers) {
    return new Set(numbers).size < numbers.length;
  },
  outedOfLottoNumberRange(numbers) {
    return numbers.some((number) =>
      isOutOfRanged(number, LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE),
    );
  },
  emptyNumbers(numbers) {
    return numbers.some(isEmpty);
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

  validatewinningNumbers(winningNumbers) {
    this.checkwinningNumbersIsEmpty(winningNumbers);
    this.checkwinningNumbersIsNotNumber(winningNumbers);
    this.checkwinningNumbersOverlapped(winningNumbers);
    this.checkwinningNumbersOutedOfLottoNumberRange(winningNumbers);
  }

  checkwinningNumbersIsEmpty(winningNumbers) {
    if (this.checkFunctions.emptyNumbers(winningNumbers)) {
      throw new ValidationError(ERROR_MESSAGE.EMPTY_OF_WINNING_NUMBER);
    }
  }

  checkwinningNumbersIsNotNumber(winningNumbers) {
    if (this.checkFunctions.isNotNumbers(winningNumbers)) {
      throw new ValidationError(ERROR_MESSAGE.WINNING_NUMBER_IS_NOT_NUMBER);
    }
  }

  checkwinningNumbersOverlapped(winningNumbers) {
    if (this.checkFunctions.overlappedNumber(winningNumbers)) {
      throw new ValidationError(ERROR_MESSAGE.OVERLAPPED_WINNING_NUMBER);
    }
  }

  checkwinningNumbersOutedOfLottoNumberRange(winningNumbers) {
    if (this.checkFunctions.outedOfLottoNumberRange(winningNumbers)) {
      throw new ValidationError(ERROR_MESSAGE.OUT_OF_RANGE_WINNING_NUMBER);
    }
  }
}
