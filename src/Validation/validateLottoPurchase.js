import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import { LOTTO_PRICE } from '../constants/MagicNumber.js';
import validateNumber from './validateNumber.js';

export default function validateLottoPurchase(input) {
  const money = validateNumber(input);
  if (money < LOTTO_PRICE) throw new Error(ERROR_MESSAGE.notEnoughMoney);

  if (money % LOTTO_PRICE !== 0) throw new Error(ERROR_MESSAGE.notANote);
  return money;
}
