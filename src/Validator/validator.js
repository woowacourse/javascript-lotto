const Validator = {
  validatePurchaseMoney(purchaseMoney) {
    if (Number.isNaN(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 숫자로 입력해야 합니다.");
  },
};

export default Validator;
