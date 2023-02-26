export const RANK = Object.freeze({
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  INVALID_RANK: 0,
});

export const RANKING_TABLE = Object.freeze([
  RANK.INVALID_RANK,
  RANK.INVALID_RANK,
  RANK.INVALID_RANK,
  RANK.FIFTH,
  RANK.FOURTH,
  RANK.THIRD,
  RANK.FIRST,
]);

export const MATCH_COUNT = [3, 4, 5, 5, 6];
