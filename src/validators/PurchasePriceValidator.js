import { validateRange, validateType, validateUnit } from "./validate";

const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType(purchasePrice);
    validateRange(purchasePrice);
    validateUnit(purchasePrice);
  },
};

export { PurchasePriceValidator };
