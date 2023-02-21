/* eslint-disable no-restricted-globals */
const {
  EMPTY_STRING,
  PRICE_UNIT,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
  REGEX,
  ERROR_MESSAGE,
} = require('../../constants/constants');

const validator = {
  purchasePrice(input) {
    validator.isEmpty(input);
    validator.isBlankIncluded(input);
    validator.isNumber(input);
    validator.isValidUnit(input);
    validator.isSmallerOrEqualThanZero(input);
  },

  winningNumbers(input) {
    const winningNumbers = input.split(',').map(Number);
    validator.isEmpty(input);
    validator.isBlankIncluded(input);
    winningNumbers.map(validator.isNumber);
    winningNumbers.map(validator.isNumberRangeValid);
    validator.isNumbersCountValid(input.length);
    validator.isNumberDuplicated(input);
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

  isBlankIncluded(input) {
    if (REGEX.BLANK.test(input)) throw new Error(ERROR_MESSAGE.BLANK);
  },

  isEmpty(input) {
    if (input === EMPTY_STRING) throw new Error(ERROR_MESSAGE.EMPTY);
  },

  isNumber(input) {
    if (!REGEX.NUMBER.test(input)) throw new Error(ERROR_MESSAGE.NUMBER);
  },

  isValidUnit(input) {
    if (Number(input) % PRICE_UNIT !== 0) throw new Error(ERROR_MESSAGE.UNIT);
  },

  isSmallerOrEqualThanZero(input) {
    if (Number(input) <= 0) throw new Error(ERROR_MESSAGE.PRICE_RANGE);
  },

  isNumbersCountValid(inputLength) {
    if (inputLength !== LOTTO_NUMBER_COUNT)
      throw new Error(ERROR_MESSAGE.COUNT);
  },

  isNumberRangeValid(number) {
    if (
      Number(number) <= LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER &&
      Number(number) >= LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER
    )
      throw new Error(ERROR_MESSAGE.LOTTO_RANGE);
  },

  isNumberDuplicated(numbers) {
    if (new Set(numbers).size !== numbers.length)
      throw new Error(ERROR_MESSAGE.DUPLICATE);
  },

  isRestartCommandValid(input) {
    return REGEX.RESTART_COMMAND.test(input) && input.length === 1;
  },
};

module.exports = validator;
