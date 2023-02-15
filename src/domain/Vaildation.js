const Validation = {
  isNumber(purchaseAmount) {
    return Number.isInteger(Number(purchaseAmount));
  },
};

export default Validation;
