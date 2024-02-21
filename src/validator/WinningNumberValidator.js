const WinningNumberValidator = {
  isNotValidCount(inputValue) {
    return inputValue.length !== 6;
  },

  isNotNumber(inputValue) {
    return inputValue.some((number) => !Number.isInteger(number));
  },

  isNotUnique(inputValue) {
    return new Set(inputValue).size !== inputValue.length;
  },

  isNotRange(inputValue) {
    return inputValue.some((number) => number < 1 || number > 45);
  },
};

export default WinningNumberValidator;
