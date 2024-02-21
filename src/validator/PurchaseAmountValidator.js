const PurchaseAmountValidator = {
  isNotNumber(inputValue) {
    return !Number.isInteger(Number(inputValue));
  },

  isEmpty(inputValue) {
    return inputValue === '';
  },

  isNotUnit(inputValue) {
    return Number(inputValue) % 100 !== 0;
  },

  isNotMinRange(inputValue) {
    return Number(inputValue) < 1000;
  },
};

export default PurchaseAmountValidator;
