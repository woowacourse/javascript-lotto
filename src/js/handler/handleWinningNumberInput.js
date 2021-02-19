import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE } from '../utils/constant.js';
import { openModal } from '../view/viewModalPage.js';

const getWinningNumbers = (lotto, winningNumbers) => {
  lotto.winningNumbers = winningNumbers;
};

const getBonusNumber = (lotto, bonusNumber) => {
  lotto.bonusNumber = bonusNumber;
};

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

  getWinningNumbers(lotto, winningNumbers);
  getBonusNumber(lotto, bonusNumber);

  openModal();
};
