const {
  EMPTY_STRING,
  ERROR_MESSAGE,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
  PRICE_UNIT,
  REGEX,
} = require('../../js/constants/constants');

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
    validator.isNumbersCountValid(winningNumbers.length);
    validator.isNumberDuplicated(winningNumbers);
  },

  bonusNumber(winningNumbers, input) {
    validator.isEmpty(input);
    validator.isBlankIncluded(input);
    validator.isNumber(input);
    validator.isNumberRangeValid(input);
    validator.isNumberDuplicated([...winningNumbers, Number(input)]);
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
      number > LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER ||
      number < LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER
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
