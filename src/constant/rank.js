export const MATCH_TO_RANK_TABLE = {
  "3_false": 5,
  "3_true": 5,
  "4_false": 4,
  "4_true": 4,
  "5_false": 3,
  "5_true": 2,
  "6_false": 1,
  "6_true": 1,
};

export const RANK_INFO_TABLE = {
  1: { price: 2_000_000_000, message: "6개 일치" },
  2: { price: 30_000_000, message: "5개 일치, 보너스 볼 일치" },
  3: { price: 1_500_000, message: "5개 일치" },
  4: { price: 50_000, message: "4개 일치" },
  5: { price: 5_000, message: "3개 일치" },
};
