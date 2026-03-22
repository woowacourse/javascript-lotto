export const LOTTO = Object.freeze({
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1000,
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

export const RANK_CONDITION = {
  [RANK.FIRST]: { count: 6, hasBonus: false },
  [RANK.SECOND]: { count: 5, hasBonus: true },
  [RANK.THIRD]: { count: 5, hasBonus: false },
  [RANK.FOURTH]: { count: 4, hasBonus: false },
  [RANK.FIFTH]: { count: 3, hasBonus: false },
};
