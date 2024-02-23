const BonusNumberValidator = {
  isNumber(inputValue) {
    return !Number.isNaN(inputValue);
  },

  isValidRange(inputValue) {
    return inputValue >= 1 && inputValue <= 45;
  },

  isUniqueBonusNumber(inputValue, winningNumbers) {
    return !winningNumbers.includes(inputValue);
  },
};

export default BonusNumberValidator;
