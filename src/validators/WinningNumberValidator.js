import { ERROR, RANDOM, LOTTO } from '../constants';

const WinningNumberValidator = {
  validate(inputValue) {
    this.validateCount(inputValue);
    this.validateInteger(inputValue);
    this.validateDuplicate(inputValue);
    this.validateWithinRange(inputValue);
  },

  validateCount(inputValue) {
    if (inputValue.length !== LOTTO.SIZE) throw new Error(ERROR.INVALID_LENGTH);
  },

  validateInteger(inputValue) {
    if (inputValue.some((number) => !Number.isInteger(number)))
      throw new Error(ERROR.INVALID_NUMBER_FORMAT);
  },

  validateDuplicate(inputValue) {
    if (new Set(inputValue).size !== inputValue.length) throw new Error(ERROR.DUPLICATE_NUMBER);
  },

  validateWithinRange(inputValue) {
    if (!inputValue.every((number) => number >= RANDOM.MIN && number <= RANDOM.MAX))
      throw new Error(ERROR.OUT_OF_RANGE);
  },
};

export default WinningNumberValidator;
