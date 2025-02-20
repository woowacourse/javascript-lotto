import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import { printError } from '../View/OutputView.js';
import isInteger from './isInteger.js';
import isNumber from './isNumber.js';
import isPositive from './isPositive.js';

export default function checkLottoPurchase(input) {
  isNumber(input);
  isInteger(input);
  isPositive(input);
  if (Number(input) < 1000) throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (Number(input) % 1000 !== 0) throw new Error(ERROR_MESSAGE.notANote);

  return Number(input) / 1000;
}
