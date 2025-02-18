const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType(purchasePrice);
  },
};

const validateType = (purchasePrice) => {
  if (typeof purchasePrice !== "number") {
    throw new Error("구매 금액은 숫자여야 합니다.");
  }
};

const validateRange = (purchasePrice) => {
  if (purchasePrice < 1000) {
    throw new Error("구매 금액은 1,000원 이상이어야 합니다.");
  }
};

export { PurchasePriceValidator, validateType, validateRange };
