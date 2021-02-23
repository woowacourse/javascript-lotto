import { $, $$ } from '../utils/querySelector.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { openModal, renderModal } from '../view/viewModalPage.js';
import { getTicketResult } from '../components/getTicketResult.js';

const getRankCountMap = (lotto) => {
  const rankCountMap = new Map([
    [VALUE.WINNING_RANK.FIRST, 0],
    [VALUE.WINNING_RANK.SECOND, 0],
    [VALUE.WINNING_RANK.THIRD, 0],
    [VALUE.WINNING_RANK.FOURTH, 0],
    [VALUE.WINNING_RANK.FIFTH, 0],
    [VALUE.WINNING_RANK.NONE, 0],
  ]);

  lotto.tickets.forEach(({ winningRank }) => {
    rankCountMap.set(winningRank, rankCountMap.get(winningRank) + 1);
  });

  return rankCountMap;
};

const getTotalYield = (lotto) => {
  const totalProfit = lotto.tickets.reduce((acc, ticket) => {
    return (acc += ticket.profit);
  }, 0);

  return Number(((totalProfit / lotto.purchasePrice) * 100).toFixed(2));
};

const isValidNumberInput = (inputNumbers) => {
  if (!isValidRange(inputNumbers)) {
    alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
    return false;
  }

  if (isDuplicate(inputNumbers)) {
    alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    return false;
  }
  return true;
};

export const handleWinningNumberSubmit = (lotto) => {
  const winningNumbers = [...$$('.winning-number')].map((winningNumber) =>
    Number(winningNumber.value),
  );
  const bonusNumber = Number($('.bonus-number').value);
  const inputNumbers = [...winningNumbers, bonusNumber];

  if (!isValidNumberInput(inputNumbers)) {
    return;
  }

  lotto.tickets.forEach((ticket) => {
    getTicketResult(ticket, winningNumbers, bonusNumber);
  });

  renderModal(getRankCountMap(lotto), getTotalYield(lotto));
  openModal();
};
