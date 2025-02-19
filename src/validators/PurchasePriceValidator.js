import { validateRange, validateType } from "./validate";

const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType(purchasePrice);
    validateRange(purchasePrice);
    validateUnit(purchasePrice);
  },
};

const validateUnit = (purchasePrice) => {
  if (purchasePrice % 1000 !== 0) {
    throw new Error("구매 금액은 1,000원 단위로 입력해야 합니다.");
  }
};

export { PurchasePriceValidator, validateUnit };
