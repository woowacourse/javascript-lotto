import { RANKING } from '../constants/constants.js';

export const calculateRank = (matchCount, isBonusMatch) => {
  if (matchCount === RANKING.FIRST.MATCH_COUNT) return RANKING.FIRST;
  if (matchCount === RANKING.SECOND.MATCH_COUNT && isBonusMatch) return RANKING.SECOND;
  if (matchCount === RANKING.THIRD.MATCH_COUNT) return RANKING.THIRD.MATCH;
  if (matchCount === RANKING.FOURTH.MATCH_COUNT) return RANKING.FOURTH;
  if (matchCount === RANKING.FIFTH.MATCH_COUNT) return RANKING.FIFTH;
};
