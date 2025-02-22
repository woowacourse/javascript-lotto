import ERROR_MESSAGE from '../constants/ErrorMessage.js';
import checkNumber from './checkNumber.js';
import checkNumberInRange from './checkNumberInRange.js';

export default function checkBonusNumber(lotto, bonusNumber) {
  checkNumber(bonusNumber);
  checkNumberInRange([bonusNumber]);
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
