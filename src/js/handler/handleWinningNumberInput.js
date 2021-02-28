import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { openModal } from '../utils/setProperty.js';
import { renderResultModal } from '../view/viewResultModal.js';

const getProfit = (winningRank) => {
  const profits = {
    [VALUE.WINNING_RANK.FIRST]: VALUE.WINNING_PRICE.FIRST,
    [VALUE.WINNING_RANK.SECOND]: VALUE.WINNING_PRICE.SECOND,
    [VALUE.WINNING_RANK.THIRD]: VALUE.WINNING_PRICE.THIRD,
    [VALUE.WINNING_RANK.FOURTH]: VALUE.WINNING_PRICE.FOURTH,
    [VALUE.WINNING_RANK.FIFTH]: VALUE.WINNING_PRICE.FIFTH,
    [VALUE.WINNING_RANK.NONE]: VALUE.WINNING_PRICE.NONE,
  };

  return profits[winningRank];
};

const getRank = (winningCount) => {
  const rank = {
    [VALUE.HIT_COUNT.SIX]: VALUE.WINNING_RANK.FIRST,
    [VALUE.HIT_COUNT.FIVE]: VALUE.WINNING_RANK.THIRD,
    [VALUE.HIT_COUNT.FOUR]: VALUE.WINNING_RANK.FOURTH,
    [VALUE.HIT_COUNT.THREE]: VALUE.WINNING_RANK.FIFTH,
    [VALUE.HIT_COUNT.TWO]: VALUE.WINNING_RANK.NONE,
    [VALUE.HIT_COUNT.ONE]: VALUE.WINNING_RANK.NONE,
    [VALUE.HIT_COUNT.NONE]: VALUE.WINNING_RANK.NONE,
  };

  return rank[winningCount];
};

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
  const totalProfit = lotto.tickets.reduce(
    (acc, ticket) => (acc += ticket.profit),
    0,
  );

  return Number(
    (
      (totalProfit / (lotto.getAmount() * VALUE.LOTTO.TICKET_PRICE)) *
      100
    ).toFixed(2),
  );
};

const setTicketResult = (ticket, winningNumbers, bonusNumber) => {
  const isBonusNumber = ticket.numbers.includes(bonusNumber);
  const winnigCount =
    VALUE.LOTTO.TICKET_LENGH * 2 -
    new Set([...ticket.numbers, ...winningNumbers]).size;

  const winningRank =
    isBonusNumber && winnigCount === VALUE.HIT_COUNT.FIVE
      ? VALUE.WINNING_RANK.SECOND
      : getRank(winnigCount);
  const profit = getProfit(winningRank);

  ticket.setWinningRank(winningRank);
  ticket.setProfit(profit);
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
    setTicketResult(ticket, winningNumbers, bonusNumber);
  });

  const ranckCountMap = getRankCountMap(lotto);
  const totalYield = getTotalYield(lotto);

  renderResultModal(ranckCountMap, totalYield);
  openModal($('#result-modal'));
};
