import { ERROR_MESSAGE, LOTTO } from '../constants';
import { toInt } from '../utils';
import ValidationResult from './validation-result';

export const isNumber = (num) => {
  return /^-?[0-9]+$/g.test(num);
};

export const isPositiveInteger = (num) => {
  return /^[0-9]+$/g.test(num) && toInt(num, 0) !== 0;
};

export const checkOverMaxMoney = (money) => {
  if (toInt(money, 10) > LOTTO.PRICE * LOTTO.MAX_PURCHASEABLE_COUNT) {
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_MONEY);
  }
  return new ValidationResult(false);
};

export const checkNotDevidedByThousandMoney = (money) => {
  if (money % 1000) {
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  }
  return new ValidationResult(false);
};

export const validateMoney = (money) => {
  return [checkOverMaxMoney(money), checkNotDevidedByThousandMoney(money)];
};

export const checkDuplicateOfWinningNumberList = (numbers) => {
  const hasError = new Set(numbers).size !== numbers.length;
  if (hasError) {
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
  }
  return new ValidationResult(false);
};

export const checkInvalidRangeOfWinningNumberList = (numbers) => {
  const hasError = numbers.some(
    (num) => !isPositiveInteger(num) || num > LOTTO.RANGE.MAX || num < LOTTO.RANGE.MIN
  );
  if (hasError) {
    return new ValidationResult(true, ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  }
  return new ValidationResult(false);
};

export const validateWinningNumberList = (numbers) => {
  return [
    checkInvalidRangeOfWinningNumberList(numbers),
    checkDuplicateOfWinningNumberList(numbers),
  ];
};
