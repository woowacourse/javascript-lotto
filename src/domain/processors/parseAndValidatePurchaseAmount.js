import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Parser from "../../utils/Parser.js";
import Validator from "../../utils/Validator.js";

const parseAndValidatePurchaseAmount = (input) => {
  const purchaseAmount = Parser.number(input);

  if (Validator.isZero(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE_ZERO);
  if (Validator.isEmpty(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
  if (Validator.isNotDivisible(purchaseAmount)) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);

  return purchaseAmount;
};
export default parseAndValidatePurchaseAmount;
