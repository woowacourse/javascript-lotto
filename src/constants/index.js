export const LOTTO = {
  min: 1,
  max: 45,
  length: 6,
  price: 1_000,
  prize: [2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000],
};

export const RANKING = {
  0: null,
  1: null,
  2: null,
  3: 5,
  4: 4,
  5: (hasBonus) => (hasBonus ? 2 : 3),
  6: 1,
};
