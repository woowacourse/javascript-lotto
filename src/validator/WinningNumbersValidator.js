import { LOTTO_SYMBOL } from '../constant/symbols';

const WinningNumbersValidator = {
  isValidCount(inputValue) {
    return inputValue.length === LOTTO_SYMBOL.COUNT;
  },

  isNumber(inputValue) {
    return inputValue.every((number) => !Number.isNaN(number));
  },

  isUniqueNumbers(inputValue) {
    return new Set(inputValue).size === LOTTO_SYMBOL.COUNT;
  },

  isValidRange(inputValue) {
    return inputValue.every(
      (number) => number >= LOTTO_SYMBOL.RANGE_MIN && number <= LOTTO_SYMBOL.RANGE_MAX,
    );
  },
};

export default WinningNumbersValidator;
