import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Validator from "../../utils/Validator.js";
const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);

  if (Validator.isEmpty(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
  if (Validator.isNotDivisible(purchaseAmount)) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);

  return purchaseAmount;
};
export default validatePurchaseAmount;
