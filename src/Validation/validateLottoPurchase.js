import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import { lottoGameSettings } from '../settings/systemSettings.js';
import validateNumber from './validateNumber.js';

export default function validateLottoPurchase(input) {
  const money = validateNumber(input);
  if (money < lottoGameSettings.lottoPrice)
    throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (money % lottoGameSettings.lottoPrice !== 0)
    throw new Error(ERROR_MESSAGE.notANote);

  return money / lottoGameSettings.lottoPrice;
}
