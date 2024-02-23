const WinningNumbersValidator = {
  isValidCount(inputValue) {
    return inputValue.length === 6;
  },

  isNumber(inputValue) {
    return inputValue.every((number) => !Number.isNaN(number));
  },

  isUniqueNumbers(inputValue) {
    return new Set(inputValue).size === inputValue.length;
  },

  isValidRange(inputValue) {
    return inputValue.every((number) => number >= 1 && number <= 45);
  },
};

export default WinningNumbersValidator;
