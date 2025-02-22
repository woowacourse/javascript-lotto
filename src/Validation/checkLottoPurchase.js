import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import { LOTTO_PRICE } from '../constants/MagicNumber.js';
import checkNumber from './checkNumber.js';

export default function checkLottoPurchase(input) {
  const money = checkNumber(input);
  if (money < LOTTO_PRICE) throw new Error(ERROR_MESSAGE.notEnoughMoney);

  if (money % LOTTO_PRICE !== 0) throw new Error(ERROR_MESSAGE.notANote);
  return money;
}
