const BonusNumberValidator = {
  isNotInteger(inputValue) {
    return !Number.isInteger(inputValue);
  },

  isInvalidRange(inputValue) {
    return !(inputValue >= 1 && inputValue <= 45);
  },

  isDuplicatedWinningNumber(winningNumber, inputValue) {
    return winningNumber.includes(inputValue);
  },
};

export default BonusNumberValidator;
