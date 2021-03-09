import { $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange, isEqual } from '../utils/validator.js';
import { ERROR_MESSAGE } from '../utils/constant.js';
import { renderSelfResultTable } from '../view/viewPurchaseModal.js';

export const handleSelfNumberInput = (lotto) => {
  const inputtedSelfNumbers = lotto.getInputtedSelfNumbers();

  if (isEqual(lotto.getAmount(), inputtedSelfNumbers.length)) {
    return alert(ERROR_MESSAGE.LOTTO.OVER_PURCHASE);
  }

  const selfNumbers = [...$$('.self-number')]
    .map((selfNumber) => Number(selfNumber.value))
    .sort((a, b) => a - b);

  if (!isValidRange(selfNumbers)) {
    return alert(ERROR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
  }

  if (isDuplicate(selfNumbers)) {
    return alert(ERROR_MESSAGE.WINNING_NUMBER.DUPLICATE);
  }

  lotto.addInputtedSelfNumbers(selfNumbers);
  renderSelfResultTable(inputtedSelfNumbers.length, selfNumbers);

  $$('.self-number').forEach((selfNumber) => {
    selfNumber.value = '';
  });
};
