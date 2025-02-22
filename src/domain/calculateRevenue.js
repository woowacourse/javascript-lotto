import { LOTTO } from '../constants/messages.js';

export const calculateRevenue = (matchCounts, purchasePrice) => {
  const totalRevenue = matchCounts
    .map((matchCount, idx) => ({ matchCount, idx }))
    .filter(({ idx }) => idx >= 3)
    .reduce((acc, { matchCount, idx }) => acc + matchCount * calculateRevenueByMatch(idx), 0);

  return Number(((totalRevenue / purchasePrice) * 100).toFixed(1));
};

export const PRIZE_OF_MATCH_COUNT = Object.freeze({
  [LOTTO.SIX_MATCH]: 2000000000,
  [LOTTO.FIVE_WITH_BONUS_MATCH_IDX]: 30000000,
  [LOTTO.FIVE_MATCH]: 1500000,
  [LOTTO.FOUR_MATCH]: 50000,
  [LOTTO.THREE_MATCH]: 5000,
});

export const calculateRevenueByMatch = (matchCount) => {
  return PRIZE_OF_MATCH_COUNT[matchCount] || 0;
};
