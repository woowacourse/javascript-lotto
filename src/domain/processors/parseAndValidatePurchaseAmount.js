import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Parser from "../../utils/Parser.js";
import Validator from "../../utils/Validator.js";

const parseAndValidatePurchaseAmount = (input) => {
  const purchaseAmount = parsePurchaseAmount(input);
  validatePurchaseAmount(purchaseAmount);

  return purchaseAmount;
};
export default parseAndValidatePurchaseAmount;

const validatePurchaseAmount = (purchaseAmount) => {
  if (Validator.isZero(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE_ZERO);
  if (Validator.isEmpty(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
  if (Validator.isNotDivisible(purchaseAmount)) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);
};

const parsePurchaseAmount = (input) => {
  return Parser.number(input);
};
