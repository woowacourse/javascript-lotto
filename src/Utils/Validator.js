const Validator = {
  validatePurchasePrice(purchasePrice) {
    const trimmedPrice = purchasePrice.trim();

    if (isNaN(trimmedPrice)) {
      throw new Error("[ERROR] 구입 금액이 숫자가 아닙니다!");
    }
    if (Number(trimmedPrice) < 1000) {
      throw new Error("[ERROR] 구입 최소 금액은 1000원 입니다!");
    }

    return trimmedPrice;
  },
};

export default Validator;
