import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import systemSettings from '../constants/systemSettings.js';
import validateNumber from './validateNumber.js';

export default function validateLottoPurchase(input) {
  const money = validateNumber(input);
  if (money < systemSettings.lottoPrice)
    throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (money % systemSettings.lottoPrice !== 0)
    throw new Error(ERROR_MESSAGE.notANote);

  return money / systemSettings.lottoPrice;
}
