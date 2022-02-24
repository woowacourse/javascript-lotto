import { ERROR_MESSAGE, LOTTO } from '../constants';
import ValidationResult from './validation-result';

const isEmpty = (str) => {
  return str.trim() === '';
};

const isNumber = (num) => {
  // Number => 소수점도 허용하기 때문에 사용하지 않는다
  // parseInt => 중간에 문자가 있어도 숫자를 리턴하기 때문에 사용하지 않는다
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
export const validateWinningNumbers = (numbers) => {
  for (let i = 0; i < numbers.length; i += 1) {
    if (isEmpty(numbers[i])) {
      return new ValidationResult(true, ERROR_MESSAGE.EMPTY_WINNING_NUMBERS);
    }
    if (!isNumber(numbers[i])) {
      return new ValidationResult(true, ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER);
    }
    if (numbers[i] < LOTTO.RANGE.MIN || numbers[i] > LOTTO.RANGE.MAX) {
      return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE);
    }
  }
  if (new Set(numbers).size === numbers.length) {
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
  }

  return new ValidationResult(false);
};
