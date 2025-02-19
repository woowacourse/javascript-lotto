import ERROR_MESSAGE from '../settings/ErrorMessage.js';
import isInteger from './isInteger.js';
import isNumber from './isNumber.js';
import isPositive from './isPositive.js';

export default function checkBonusNumber(lotto, bonusNumber) {
  isInteger(bonusNumber);
  isNumber(bonusNumber);
  isPositive(bonusNumber);
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
