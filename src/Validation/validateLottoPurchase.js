import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import validateNumber from './validateNumber.js';

export default function validateLottoPurchase(input) {
  const money = validateNumber(input);
  if (money < 1000) throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (money % 1000 !== 0) throw new Error(ERROR_MESSAGE.notANote);

  return money / 1000;
}
