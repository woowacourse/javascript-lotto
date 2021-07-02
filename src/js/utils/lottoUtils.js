import { LOTTO, VALUES } from '../constants.js';

export const getPriceByRank = (rank = VALUES.RANK.LOSE) => {
  const price = {
    [VALUES.RANK.FIRST]: VALUES.WINNING_PRICE.FIRST,
    [VALUES.RANK.SECOND]: VALUES.WINNING_PRICE.SECOND,
    [VALUES.RANK.THIRD]: VALUES.WINNING_PRICE.THIRD,
    [VALUES.RANK.FOURTH]: VALUES.WINNING_PRICE.FOURTH,
    [VALUES.RANK.FIFTH]: VALUES.WINNING_PRICE.FIFTH,
    [VALUES.RANK.LOSE]: VALUES.WINNING_PRICE.LOSE,
  };

  return price[rank];
};

export const getRankByMatchCount = (matchCount = VALUES.MATCHED_COUNT.ZERO) => {
  const rank = {
    [VALUES.MATCHED_COUNT.SIX]: VALUES.RANK.FIRST,
    [VALUES.MATCHED_COUNT.FIVE]: VALUES.RANK.THIRD,
    [VALUES.MATCHED_COUNT.FOUR]: VALUES.RANK.FOURTH,
    [VALUES.MATCHED_COUNT.THREE]: VALUES.RANK.FIFTH,
    [VALUES.MATCHED_COUNT.TWO]: VALUES.RANK.LOSE,
    [VALUES.MATCHED_COUNT.ONE]: VALUES.RANK.LOSE,
    [VALUES.MATCHED_COUNT.ZERO]: VALUES.RANK.LOSE,
  };

  return rank[matchCount];
};

export const getWinningResult = (lottos = [], winningNumbers, bonusNumber) => {
  const winningRankCounts = {
    [VALUES.RANK.FIRST]: 0,
    [VALUES.RANK.SECOND]: 0,
    [VALUES.RANK.THIRD]: 0,
    [VALUES.RANK.FOURTH]: 0,
    [VALUES.RANK.FIFTH]: 0,
    [VALUES.RANK.LOSE]: 0,
  };

  const winningTotalPrice = lottos.reduce((total, lotto) => {
    const rank = lotto.getWinningRank(winningNumbers, bonusNumber);
    winningRankCounts[rank] += 1;
    return total + getPriceByRank(rank);
  }, 0);

  const earningRate = ((winningTotalPrice / lottos.length) * LOTTO.PRICE * 100).toFixed(2);

  return { winningRankCounts, earningRate };
};
