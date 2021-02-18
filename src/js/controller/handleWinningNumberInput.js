import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';

export const handleWinningNumberInput = (lotto) => {
  // 2. 로또에 Winning Numbers 주기
  // 3. 모달(결과창) 보여주기

  const winningNumbers = [...$$('.winning-number')].map((winningNumber) =>
    Number(winningNumber.value),
  );
  const bonusNumber = Number($('.bonus-number').value);

  console.log(winningNumbers, bonusNumber);

  if (!isValidRange([...winningNumbers, bonusNumber])) {
    return alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
  }

  if (isDuplicate([...winningNumbers, bonusNumber])) {
    return alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
  }
};
