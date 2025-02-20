import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import validateNumber from './validateNumber.js';
import validateNumberInRange from './validateNumberInRange.js';

export default function validateBonusNumber(lotto, bonusNumber) {
  validateNumber(bonusNumber);
  validateNumberInRange([bonusNumber]);
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
