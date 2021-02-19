import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { openModal } from '../view/viewModalPage.js';

export const handleWinningNumberInput = (lotto) => {
  const winningNumbers = [...$$('.winning-number')].map((winningNumber) =>
    Number(winningNumber.value),
  );
  const bonusNumber = Number($('.bonus-number').value);

  if (!isValidRange([...winningNumbers, bonusNumber])) {
    return alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
  }

  if (isDuplicate([...winningNumbers, bonusNumber])) {
    return alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
  }

  lotto.getWinningNumbers(winningNumbers);
  lotto.getBonusNumber(bonusNumber);

  openModal();
};
