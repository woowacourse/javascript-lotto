import { ERROR_MESSAGE, LOTTO } from '../constants';
import ValidationResult from './validation-result';

const isEmpty = (str) => {
  return str.trim() === '';
};

const isNumber = (num) => {
  return /^-?[0-9]+$/g.test(num);
};

export const validateMoney = (money) => {
  if (isEmpty(money)) {
    return new ValidationResult(true, ERROR_MESSAGE.EMPTY_MONEY);
  }
  if (!isNumber(money)) {
    return new ValidationResult(true, ERROR_MESSAGE.NOT_INTEGER_MONEY);
  }
  if (parseInt(money, 10) < 1000) {
    return new ValidationResult(true, ERROR_MESSAGE.UNDER_MIN_MONEY);
  }
  if (money % 1000) {
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  }
  return new ValidationResult(false);
};

// eslint-disable-next-line max-lines-per-function
export const validateWinningNumber = (winningNumber) => {
  for (let i = 0; i < winningNumber.length; i += 1) {
    if (isEmpty(winningNumber[i])) {
      return new ValidationResult(true, ERROR_MESSAGE.EMPTY_WINNING_NUMBER);
    }
    if (!isNumber(winningNumber[i])) {
      return new ValidationResult(true, ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER);
    }
    if (winningNumber[i] < LOTTO.RANGE.MIN || winningNumber[i] > LOTTO.RANGE.MAX) {
      return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE);
    }
  }
  if (new Set(winningNumber).size !== winningNumber.length) {
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER);
  }
  return new ValidationResult(false);
};
