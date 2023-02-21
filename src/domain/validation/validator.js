/* eslint-disable no-restricted-globals */
const {
  EMPTY_STRING,
  PRICE_UNIT,
  lottoNumberRange,
  LOTTO_NUMBER_COUNT,
  regex,
} = require('../../constants/constants');

const validator = {
  purchasePrice(input) {
    return (
      !this.isEmptyOrBlankIncluded(input) &&
      this.isNumber(input) &&
      this.checkUnit(input) &&
      !this.isSmallerOrEqualThanZero(input)
    );
  },

  winningNumbers(winningNumbers) {
    return !this.hasDuplicate(winningNumbers);
  },

  bonusNumber(winningNumbers, input) {
    const bonusNumber = Number(input);

    return !this.hasDuplicate([...winningNumbers, bonusNumber]);
  },

  isEmptyOrBlankIncluded(input) {
    return this.isBlankIncluded(input) || this.isEmpty(input);
  },

  isNumber(input) {
    return !isNaN(input);
  },

  isBlankIncluded(input) {
    return regex.BLANK.test(input);
  },

  isEmpty(input) {
    return input === EMPTY_STRING;
  },

  isSmallerOrEqualThanZero(input) {
    return Number(input) <= 0;
  },

  checkUnit(input) {
    return Number(input) % PRICE_UNIT === 0;
  },

  checkWinningNumberCount(input) {
    return input.split(',').length === LOTTO_NUMBER_COUNT;
  },

  checkNumberRange(number) {
    return (
      Number(number) <= lottoNumberRange.MAX_LOTTO_NUMBER &&
      Number(number) >= lottoNumberRange.MIN_LOTTO_NUMBER
    );
  },

  hasDuplicate(numbers) {
    return new Set(numbers).size !== numbers.length;
  },

  checkRestartCommand(input) {
    return regex.RESTART_COMMAND.test(input) && input.length === 1;
  },
};

module.exports = validator;
