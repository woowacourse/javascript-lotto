import { validateRange, validateType } from "./validate.js";

const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType("구입 금액", purchasePrice);
    validateRange({
      key: "구입 금액",
      value: purchasePrice,
      min: 1000,
      max: 1000000,
    });
    validateUnit(purchasePrice);
  },
};

const validateUnit = (purchasePrice) => {
  if (purchasePrice % 1000 !== 0) {
    throw new Error("구입 금액은 1,000원 단위로 입력해야 합니다.");
  }
};

export { PurchasePriceValidator, validateUnit };
