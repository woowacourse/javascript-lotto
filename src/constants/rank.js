export const PRIZE = Object.freeze({
  FIRST: 6,
  SECOND: 5.5,
  THIRD: 5,
  FOURTH: 4,
  FIFTH: 3,
});

export const BONUS = 0.5;

export const RANK = Object.freeze({
  [PRIZE.FIRST]: { condition: '6개 일치', reward: 2_000_000_000, count: 0 },
  [PRIZE.SECOND]: { condition: '5개 일치, 보너스 볼 일치', reward: 30_000_000, count: 0 },
  [PRIZE.THIRD]: { condition: '5개 일치', reward: 1_500_000, count: 0 },
  [PRIZE.FOURTH]: { condition: '4개 일치', reward: 50_000, count: 0 },
  [PRIZE.FIFTH]: { condition: '3개 일치', reward: 5_000, count: 0 },
});
