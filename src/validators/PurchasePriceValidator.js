const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType(purchasePrice);
  },
};

const validateType = (purchasePrice) => {
  if (typeof purchasePrice !== "number" || Number.isNaN(purchasePrice)) {
    throw new Error("구매 금액은 숫자여야 합니다.");
  }
};

const validateRange = (purchasePrice) => {
  if (purchasePrice < 1000 || purchasePrice > 1000000) {
    throw new Error("구매 금액은 1,000원 이상 1,000,000원 이하여야 합니다.");
  }
};

const validateUnit = (purchasePrice) => {
  if (purchasePrice % 1000 !== 0) {
    throw new Error("구매 금액은 1,000원 단위로 입력해야 합니다.");
  }
};

export { PurchasePriceValidator, validateType, validateRange, validateUnit };
