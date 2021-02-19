import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { openModal } from '../view/viewModalPage.js';

const getRank = (winningCount) => {
  const rank = {
    6: VALUE.WINNING_RANK.FIRST,
    5: VALUE.WINNING_RANK.THIRD,
    4: VALUE.WINNING_RANK.FOURTH,
    3: VALUE.WINNING_RANK.FIFTH,
  };

  return rank[winningCount] ? rank[winningCount] : VALUE.WINNING_RANK.NONE;
};

const getTicketResult = (ticket, winningNumbers, bonusNumber) => {
  const bonusCount = ticket.numbers.includes(bonusNumber);
  const winnigCount =
    [...ticket.numbers, ...winningNumbers].length -
    new Set([...ticket.numbers, ...winningNumbers]).size;

  ticket.winningRank =
    bonusCount && winnigCount === 5
      ? VALUE.WINNING_RANK.SECOND
      : getRank(winnigCount);
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

  lotto.tickets.forEach((ticket) => {
    getTicketResult(ticket, winningNumbers, bonusNumber);
  });

  openModal();
};
