import { LOTTO_SYSTEM, PRIZE_OF_MATCH_COUNT } from '../constants/LottoSystem.js';

export const calculateRevenue = (matchCounts, purchasePrice) => {
  const totalRevenue = matchCounts
    .map((matchCount, idx) => ({ matchCount, idx }))
    .filter(({ idx }) => idx >= LOTTO_SYSTEM.THREE_MATCH)
    .reduce((acc, { matchCount, idx }) => acc + matchCount * calculateRevenueByMatch(idx), 0);

  return Number(((totalRevenue / purchasePrice) * 100).toFixed(1));
};

export const calculateRevenueByMatch = (matchCount) => {
  return PRIZE_OF_MATCH_COUNT[matchCount] || 0;
};
