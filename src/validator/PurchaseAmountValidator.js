const PurchaseAmountValidator = {
  isNumber(inputValue) {
    return !Number.isNaN(inputValue);
  },

  isValidUnit(inputValue) {
    return inputValue % 1000 === 0;
  },

  isValidMinRange(inputValue) {
    return inputValue > 1000;
  },
};

export default PurchaseAmountValidator;
