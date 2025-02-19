import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export default function checkBonusNumber(lotto, bonusNumber) {
  if (lotto.numbers.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.duplicatedBonusNumbers);
  return { checkedLotto: lotto, checkedBonusNumber: bonusNumber };
}
