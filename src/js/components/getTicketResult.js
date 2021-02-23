import { VALUE } from '../utils/constant.js';

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

const getWinningRank = (winnigCount, hasBonusCount) => {
  return hasBonusCount && winnigCount === VALUE.HIT_COUNT.FIVE
    ? VALUE.WINNING_RANK.SECOND
    : getRank(winnigCount);
};

const getWinningCount = (nums) => {
  return nums.length - new Set(nums).size;
};

export const getTicketResult = (ticket, winningNumbers, bonusNumber) => {
  const winnigCount = getWinningCount([...ticket.numbers, ...winningNumbers]);
  const hasBonusCount = ticket.numbers.includes(bonusNumber);
  const winningRank = getWinningRank(winnigCount, hasBonusCount);
  const profit = getProfit(winningRank);

  ticket.setWinningRank(winningRank);
  ticket.setProfit(profit);
};
