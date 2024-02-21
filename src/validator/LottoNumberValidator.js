import ERROR from "../constants/error.js";

const lottoNumberValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_LENGTH);
    }
  },

  validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_DUPLICATE);
    }
  },

  validateRange(numbers) {
    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_RANGE);
    }
  },

  validateType(numbers) {
    if (numbers.some((number) => !Number.isInteger(number))) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_TYPE);
    }
  },

  validate(numbers) {
    this.validateNumbersLength(numbers);
    this.validateDuplicate(numbers);
    this.validateRange(numbers);
    this.validateType(numbers);
  },
};

export default lottoNumberValidator;
