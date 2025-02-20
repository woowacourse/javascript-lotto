import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import validateNumber from './validateNumber.js';
import systemSettings from '../settings/systemSettings.js';

export default function validateLottoPurchase(input) {
  const money = validateNumber(input);
  if (money < systemSettings.lottoPrice)
    throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (money % systemSettings.lottoPrice !== 0)
    throw new Error(ERROR_MESSAGE.notANote);

  return money / systemSettings.lottoPrice;
}
