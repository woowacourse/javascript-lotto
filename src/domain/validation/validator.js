/* eslint-disable no-restricted-globals */
const {
  EMPTY_STRING,
  PRICE_UNIT,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
  REGEX,
} = require('../../constants/constants');

const validator = {
  isPurchasePriceValid(input) {
    return (
      !this.isEmptyOrBlankIncluded(input) &&
      this.isNumber(input) &&
      this.isValidUnit(input) &&
      !this.isSmallerOrEqualThanZero(input)
    );
  },

  isWinningNumbersValid(input) {
    const winningNumbers = input.split(',').map(Number);
    return (
      !this.isEmptyOrBlankIncluded(input) &&
      winningNumbers.every(this.isNumber) &&
      this.isWinningNumberCountValid(input) &&
      !this.isNumberDuplicated(winningNumbers) &&
      winningNumbers.every(this.isNumberRangeValid)
    );
  },

  isBonusNumberValid(winningNumbers, input) {
    const bonusNumber = Number(input);

    return (
      !this.isEmptyOrBlankIncluded(bonusNumber) &&
      this.isNumber(bonusNumber) &&
      this.isNumberRangeValid(bonusNumber) &&
      !this.isNumberDuplicated([...winningNumbers, bonusNumber])
    );
  },

  isEmptyOrBlankIncluded(input) {
    return this.isBlankIncluded(input) || this.isEmpty(input);
  },

  isNumber(input) {
    return !isNaN(input);
  },

  isBlankIncluded(input) {
    return REGEX.BLANK.test(input);
  },

  isEmpty(input) {
    return input === EMPTY_STRING;
  },

  isSmallerOrEqualThanZero(input) {
    return Number(input) <= 0;
  },

  isValidUnit(input) {
    return Number(input) % PRICE_UNIT === 0;
  },

  isWinningNumberCountValid(input) {
    return input.split(',').length === LOTTO_NUMBER_COUNT;
  },

  isNumberRangeValid(number) {
    return (
      Number(number) <= LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER &&
      Number(number) >= LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER
    );
  },

  isNumberDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  },

  isRestartCommandValid(input) {
    return REGEX.RESTART_COMMAND.test(input) && input.length === 1;
  },
};

module.exports = validator;
