import { $, $$ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { isDuplicate } from '../utils/validator.js';
import { openModal, renderModal } from '../view/viewModalPage.js';
import { setTicketResult } from '../components/setTicketResult.js';

const getRankCountMap = (lotto) => {
  const rankCountMap = {
    [VALUE.WINNING_RANK.FIRST]: 0,
    [VALUE.WINNING_RANK.SECOND]: 0,
    [VALUE.WINNING_RANK.THIRD]: 0,
    [VALUE.WINNING_RANK.FOURTH]: 0,
    [VALUE.WINNING_RANK.FIFTH]: 0,
    [VALUE.WINNING_RANK.NONE]: 0,
  };

  lotto.tickets.forEach(({ winningRank }) => {
    rankCountMap[winningRank] += 1;
  });

  return rankCountMap;
};

const getTotalYield = (lotto) => {
  const totalProfit = lotto.tickets.reduce((acc, ticket) => {
    return (acc += ticket.profit);
  }, 0);

  return Number(((totalProfit / lotto.purchasePrice) * 100).toFixed(2));
};

const isValidRange = (num) => {
  return VALUE.LOTTO.MIN_NUM <= num && num <= VALUE.LOTTO.MAX_NUM;
};

export const handleWinningNumberSubmit = (lotto) => {
  const winningNumbers = [...$$('.winning-number')].map((winningNumber) =>
    Number(winningNumber.value),
  );
  const bonusNumber = Number($('.bonus-number').value);
  const inputNumbers = [...winningNumbers, bonusNumber];

  if (!inputNumbers.every((num) => isValidRange(num))) {
    alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
    return;
  }

  if (isDuplicate(inputNumbers)) {
    alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    return;
  }

  lotto.tickets.forEach((ticket) => {
    setTicketResult(ticket, winningNumbers, bonusNumber);
  });

  renderModal(getRankCountMap(lotto), getTotalYield(lotto));
  openModal();
};
