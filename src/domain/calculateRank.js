import { RANKING } from '../constants/constants.js';

export const calculateRank = (matchCount, isBonusMatch) => {
  if (matchCount === RANKING.FIRST.MATCH_COUNT) return RANKING.FIRST.RANK;
  if (matchCount === RANKING.SECOND.MATCH_COUNT && isBonusMatch) return RANKING.SECOND.RANK;
  if (matchCount === RANKING.THIRD.MATCH_COUNT) return RANKING.THIRD.RANK;
  if (matchCount === RANKING.FOURTH.MATCH_COUNT) return RANKING.FOURTH.RANK;
  if (matchCount === RANKING.FIFTH.MATCH_COUNT) return RANKING.FIFTH.RANK;
};
