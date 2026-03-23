export const LOTTO = Object.freeze({
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1000,
  MAX_PRICE: 100_000,
});

export const RANK = {
  FIRST: "RANK_1",
  SECOND: "RANK_2",
  THIRD: "RANK_3",
  FOURTH: "RANK_4",
  FIFTH: "RANK_5",
};

export const RANK_PRIZE = {
  [RANK.FIRST]: 2_000_000_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.FOURTH]: 50_000,
  [RANK.FIFTH]: 5_000,
};

export const RANK_DESCRIPTION = {
  [RANK.FIFTH]: "3개",
  [RANK.FOURTH]: "4개",
  [RANK.THIRD]: "5개",
  [RANK.SECOND]: "5개 + 보너스 볼",
  [RANK.FIRST]: "6개",
};
