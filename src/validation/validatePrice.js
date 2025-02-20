import runValidators from "../util/runValidators.js";
import validationCondition from "./validateCondition.js";
import { PRICE_ERROR_MESSAGE } from "../constants/errorMessage.js";

const checkEmptyInput = (priceInput) => {
  if (validationCondition.isEmpty(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.EMPTY);
  }
};

const checkIsNumber = (priceInput) => {
  if (!validationCondition.isNumber(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.NUMBER);
  }
};

const checkUnderPrice = (priceInput) => {
  if (validationCondition.isUnder(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.UNDER_PRICE);
  }
};

const checkDivisiblePrice = (priceInput) => {
  if (!validationCondition.isDivisible(priceInput)) {
    throw new Error(PRICE_ERROR_MESSAGE.INDIVISIBLE);
  }
};
const validatePrice = (priceInput) => runValidators([checkEmptyInput, checkIsNumber, checkUnderPrice, checkDivisiblePrice], priceInput);

export default validatePrice;
