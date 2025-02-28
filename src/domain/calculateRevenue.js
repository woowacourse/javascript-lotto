import { LOTTO } from './lottoConstants.js';

export const calculateRevenue = (matchCounts, purchasePrice) => {
  const matchedCountsMoreThanThree = matchCounts.slice(LOTTO.THREE_MATCH);
  const sumOfLottoPrize = matchedCountsMoreThanThree.reduce(
    (acc, cur, idx) => acc + cur * calculateRevenueByMatch(idx + LOTTO.THREE_MATCH),
    0,
  );

  return Number(((sumOfLottoPrize / purchasePrice) * 100).toFixed(1));
};

export const calculateRevenueByMatch = (matchCount) => {
  if (matchCount === LOTTO.SIX_MATCH) return LOTTO.PRIZE_OF_SIX_MATCH;
  else if (matchCount === LOTTO.FIVE_WITH_BONUS_MATCH_IDX) return LOTTO.PRIZE_OF_FIVE_WITH_BONUS_MATCH;
  else if (matchCount === LOTTO.FIVE_MATCH) return LOTTO.PRIZE_OF_FIVE_MATCH;
  else if (matchCount === LOTTO.FOUR_MATCH) return LOTTO.PRIZE_OF_FOUR_MATCH;
  else if (matchCount === LOTTO.THREE_MATCH) return LOTTO.PRIZE_OF_THREE_MATCH;
  return 0;
};
