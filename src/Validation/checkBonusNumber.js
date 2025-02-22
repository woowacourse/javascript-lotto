import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import validateNumber from './checkNumber.js';
import validateNumberInRange from './checkNumberInRange.js';

export default function validateBonusNumber(lotto, bonusNumber) {
  validateNumber(bonusNumber);
  validateNumberInRange([bonusNumber]);
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
