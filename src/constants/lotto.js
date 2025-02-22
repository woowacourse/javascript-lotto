export const LOTTO_NUMBER = Object.freeze({
  MIN: 1,
  MAX: 45,
  LENGTH: 6,
});

export const LOTTO_STATUS = Object.freeze([
  { RANK: 1, COUNT: 6, REWARD: 2_000_000_000, IS_BONUS: null },
  { RANK: 2, COUNT: 5, REWARD: 30_000_000, IS_BONUS: true },
  { RANK: 3, COUNT: 5, REWARD: 1_500_000, IS_BONUS: false },
  { RANK: 4, COUNT: 4, REWARD: 50_000, IS_BONUS: null },
  { RANK: 5, COUNT: 3, REWARD: 5000, IS_BONUS: null },
]);

export const WINNING_HISTORY = Object.freeze({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
})
