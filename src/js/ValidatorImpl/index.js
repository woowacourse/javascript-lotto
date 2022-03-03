import Validator from '../EventListener/Validator.js';
import ValidationError from '../ValidationError/index.js';
import {
  LOTTO_PRICE,
  LOTTO_RULES,
  ERROR_MESSAGE,
  ORDER_TO_FOCUS_ON_VIEW,
} from '../constant/index.js';
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
      throw new ValidationError(ERROR_MESSAGE.LACK_OF_FARE, ORDER_TO_FOCUS_ON_VIEW.FARE);
    }
  }

  validateWinningNumber(winningNumber) {
    this.checkWinningNumberIsEmpty(winningNumber);
    this.checkWinningNumberIsNotNumber(winningNumber);
    this.checkWinningNumberOverlapped(winningNumber);
    this.checkWinningNumberOutedOfLottoNumberRange(winningNumber);
  }

  checkWinningNumberIsEmpty(winningNumber) {
    if (this.checkFunctions.emptyNumbers(winningNumber)) {
      throw new ValidationError(
        ERROR_MESSAGE.EMPTY_OF_WINNING_NUMBER,
        ORDER_TO_FOCUS_ON_VIEW.EMPTY_NUMBER,
      );
    }
  }

  checkWinningNumberIsNotNumber(winningNumber) {
    if (this.checkFunctions.isNotNumbers(winningNumber)) {
      throw new ValidationError(
        ERROR_MESSAGE.WINNING_NUMBER_IS_NOT_NUMBER,
        ORDER_TO_FOCUS_ON_VIEW.NOT_NUMBER,
      );
    }
  }

  checkWinningNumberOverlapped(winningNumber) {
    if (this.checkFunctions.overlappedNumber(winningNumber)) {
      throw new ValidationError(
        ERROR_MESSAGE.OVERLAPPED_WINNING_NUMBER,
        ORDER_TO_FOCUS_ON_VIEW.OVERLAPPED_NUMBER,
      );
    }
  }

  checkWinningNumberOutedOfLottoNumberRange(winningNumber) {
    if (this.checkFunctions.outedOfLottoNumberRange(winningNumber)) {
      throw new ValidationError(
        ERROR_MESSAGE.OUT_OF_RANGE_WINNING_NUMBER,
        ORDER_TO_FOCUS_ON_VIEW.OUT_OF_RANGE_NUMBER,
      );
    }
  }
}
