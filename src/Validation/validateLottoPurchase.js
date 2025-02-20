import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import isInteger from '../util/isInteger.js';
import isNumber from '../util/isNumber.js';
import isPositive from '../util/isPositive.js';

export default function validateLottoPurchase(input) {
  isNumber(input);
  isInteger(input);
  isPositive(input);
  if (Number(input) < 1000) throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (Number(input) % 1000 !== 0) throw new Error(ERROR_MESSAGE.notANote);

  return Number(input) / 1000;
}
