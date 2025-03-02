import runValidators from "../util/runValidators.js";
import validationCondition from "./validateCondition.js";
import { PRICE_ERROR_MESSAGE } from "../lottoConstants/errorMessage.js";
import { LOTTO_PRICE } from "../lottoConstants/systemConstants.js";

const checkEmptyInput = (priceInput) => {
  if (validationCondition.isEmpty(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.EMPTY);
  }
};
const checkIsTooLarge = (priceInput) => {
  if (validationCondition.isTooLarge(priceInput, LOTTO_PRICE.MAX)) {
    throw new Error(PRICE_ERROR_MESSAGE.OVER_PRICE);
  }
};
const checkIsNumber = (priceInput) => {
  if (!validationCondition.isNumber(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.NUMBER);
  }
};

const checkUnderPrice = (priceInput) => {
  if (validationCondition.isUnder(priceInput, LOTTO_PRICE.MIN)) {
    throw new Error(PRICE_ERROR_MESSAGE.UNDER_PRICE);
  }
};

const checkDivisiblePrice = (priceInput) => {
  if (!validationCondition.isDivisible(priceInput, LOTTO_PRICE.UNIT)) {
    throw new Error(PRICE_ERROR_MESSAGE.INDIVISIBLE);
  }
};
const validatePrice = (priceInput) => runValidators([checkEmptyInput, checkIsNumber, checkIsTooLarge, checkUnderPrice, checkDivisiblePrice], priceInput);

export default validatePrice;
