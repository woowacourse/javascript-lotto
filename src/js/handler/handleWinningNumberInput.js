import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { openModal } from '../view/viewModalPage.js';

const setLottoTotalProfit = (lotto) => {
  lotto.totalProfit = lotto.tickets.reduce((acc, ticket) => {
    return (acc += ticket.profit);
  }, 0);
};

const getProfit = (winningRank) => {
  const profits = {
    1: VALUE.WINNING_PRICE.FIRST,
    2: VALUE.WINNING_PRICE.SECOND,
    3: VALUE.WINNING_PRICE.THIRD,
    4: VALUE.WINNING_PRICE.FOURTH,
    5: VALUE.WINNING_PRICE.FIFTH,
    0: VALUE.WINNING_PRICE.NONE,
  };

  return profits[winningRank];
};

const getRank = (winningCount) => {
  const rank = {
    6: VALUE.WINNING_RANK.FIRST,
    5: VALUE.WINNING_RANK.THIRD,
    4: VALUE.WINNING_RANK.FOURTH,
    3: VALUE.WINNING_RANK.FIFTH,
    2: VALUE.WINNING_RANK.NONE,
    1: VALUE.WINNING_RANK.NONE,
    0: VALUE.WINNING_RANK.NONE,
  };

  return rank[winningCount];
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
  ticket.profit = getProfit(ticket.winningRank);
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

  setLottoTotalProfit(lotto);
  console.log(lotto);
  openModal();
};
