import ERROR from "../constants/error.js";
import { LOTTO_LENGTH, LOTTO_RANGE } from "../constants/option.js";

const lottoNumberValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== LOTTO_LENGTH) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_LENGTH);
    }
  },

  validateDuplicate(numbers) {
    if (new Set(numbers).size !== LOTTO_LENGTH) {
      throw new Error(ERROR.INVALID_LOTTO_NUMBER_DUPLICATE);
    }
  },

  validateRange(numbers) {
    if (
      numbers.some(
        (number) => number < LOTTO_RANGE.MIN || number > LOTTO_RANGE.MAX,
      )
    ) {
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
