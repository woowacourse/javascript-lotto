import runValidators from '../util/runValidators.js';
import validationCondition from './validateCondition.js';
import { PRICE_ERROR_MESSAGE } from '../constants/errorMessage.js';
import checkEmptyInput from './checkEmptyInput.js';

const checkEmpty = (priceInput) => checkEmptyInput(priceInput, PRICE_ERROR_MESSAGE.EMPTY);

const checkIsInteger = (priceInput) => {
  if (!validationCondition.isInteger(priceInput)) {
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
const validatePrice = (priceInput) =>
  runValidators([checkEmpty, checkIsInteger, checkUnderPrice, checkDivisiblePrice], priceInput);

export default validatePrice;
