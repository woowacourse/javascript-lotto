/* eslint-disable no-restricted-globals */
const {
  BLANK_REGEXP,
  EMPTY_STRING,
  PRICE_UNIT,
  lottoNumberRange,
  LOTTO_NUMBER_COUNT,
} = require('../../constants/constants');

const validator = {
  isWinningNumberValid(input) {
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
    return BLANK_REGEXP.test(input);
  },

  isEmpty(input) {
    return input === EMPTY_STRING;
  },

  isSmallerOrEqualThanZero(input) {
    return input <= 0;
  },

  isValidUnit(input) {
    return input % PRICE_UNIT === 0;
  },

  isWinningNumberCountValid(input) {
    return input.split(',').length === LOTTO_NUMBER_COUNT;
  },

  isNumberRangeValid(number) {
    return (
      number <= lottoNumberRange.MAX_LOTTO_NUMBER &&
      number >= lottoNumberRange.MIN_LOTTO_NUMBER
    );
  },

  isNumberDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  },
};

module.exports = validator;
