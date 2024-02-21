const PurchaseAmountValidator = {
  isNotNumber(inputValue) {
    return !Number.isInteger(inputValue);
  },

  isNotUnit(inputValue) {
    return inputValue % 100 !== 0;
  },

  isNotMinRange(inputValue) {
    return inputValue < 1000;
  },
};

export default PurchaseAmountValidator;
