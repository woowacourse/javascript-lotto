export const WINNING_RANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  NONE: 0,
};

export const PRIZE = {
  [WINNING_RANK.FIFTH]: { reward: 5_000, matchCount: 3, bonus: false },
  [WINNING_RANK.FOURTH]: { reward: 50_000, matchCount: 4, bonus: false },
  [WINNING_RANK.THIRD]: { reward: 1_500_000, matchCount: 5, bonus: false },
  [WINNING_RANK.SECOND]: { reward: 30_000_000, matchCount: 5, bonus: true },
  [WINNING_RANK.FIRST]: { reward: 2_000_000_000, matchCount: 6, bonus: false },
};

export const PERCENTATION = 100;
