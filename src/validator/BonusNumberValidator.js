const BonusNumberValidator = {
  isNotInteger(inputValue) {
    return !Number.isInteger(inputValue);
  },

  isInvalidRange(inputValue) {
    return !(inputValue >= 1 && inputValue <= 45);
  },

  isDuplicatedWinningNumbers(inputValue, winningNumbers) {
    return winningNumbers.includes(inputValue);
  },
};

export default BonusNumberValidator;
