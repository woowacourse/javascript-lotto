import { RANK_KEYS, RANK_PRIZE } from '../constants/rank';

export function computeRankPrize(rank) {
  if (rank === RANK_KEYS.FIRST) {
    return RANK_PRIZE.FIRST;
  }
  if (rank === RANK_KEYS.SECOND) {
    return RANK_PRIZE.SECOND;
  }
  if (rank === RANK_KEYS.THIRD) {
    return RANK_PRIZE.THIRD;
  }
  if (rank === RANK_KEYS.FORTH) {
    return RANK_PRIZE.FORTH;
  }
  if (rank === RANK_KEYS.FIFTH) {
    return RANK_PRIZE.FIFTH;
  }
  return RANK_PRIZE.UNRANK;
}

export function computeRank(numberMatchCount, isMatchBonus) {
  if (numberMatchCount === 6) {
    return RANK_KEYS.FIRST;
  }
  if (numberMatchCount === 5 && isMatchBonus) {
    return RANK_KEYS.SECOND;
  }
  if (numberMatchCount === 5 && !isMatchBonus) {
    return RANK_KEYS.THIRD;
  }
  if (numberMatchCount === 4) {
    return RANK_KEYS.FORTH;
  }
  if (numberMatchCount === 3) {
    return RANK_KEYS.FIFTH;
  }
  return RANK_KEYS.UNRANK;
}
