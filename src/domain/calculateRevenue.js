import { LOTTO } from '../constants/messages.js';

export const calculateRevenue = (matchedCounts, purchasePrice) => {
  return Number(
    ((matchedCounts.reduce((acc, cur) => (acc += calculateRevenueByMatch(cur)), 0) / purchasePrice) * 100).toFixed(1),
  );
};

export const calculateRevenueByMatch = (matchedCount) => {
  if (matchedCount === LOTTO.SIX_MATCH) return LOTTO.PRIZE_OF_SIX_MATCH;
  else if (matchedCount === LOTTO.FIVE_WITH_BONUS_MATCH) return LOTTO.PRIZE_OF_FIVE_WITH_BONUS_MATCH;
  else if (matchedCount === LOTTO.FIVE_MATCH) return LOTTO.PRIZE_OF_FIVE_MATCH;
  else if (matchedCount === LOTTO.FOUR_MATCH) return LOTTO.PRIZE_OF_FOUR_MATCH;
  else if (matchedCount === LOTTO.THREE_MATCH) return LOTTO.PRIZE_OF_THREE_MATCH;
  return 0;
};
