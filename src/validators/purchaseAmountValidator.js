const purchaseAmountValidator = {
  validateUnitAmount(purchaseAmount) {
    if (purchaseAmount % 1000 !== 0) {
      throw new Error('[ERROR] 로또 구매 금액은 1000원 단위로 입력해주세요.');
    }
  },

  validateBlank(purchaseAmount) {
    if (purchaseAmount.trim().length === 0) {
      throw new Error('[ERROR] 로또 구매 금액은 숫자로 입력해주세요.');
    }
  },
};

export default purchaseAmountValidator;
