import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import isInteger from '../util/isInteger.js';
import isNumber from '../util/isNumber.js';
import isPositive from '../util/isPositive.js';
import validateNumberInRange from './validateNumberInRange.js';

export default function validateBonusNumber(lotto, bonusNumber) {
  isNumber(bonusNumber);
  isInteger(bonusNumber);
  isPositive(bonusNumber);
  validateNumberInRange([bonusNumber]);
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
