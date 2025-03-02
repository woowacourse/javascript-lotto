export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_LENGTH = 6;

export const MATCH_KEY = Object.freeze({
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  FIVE_AND_BONUS: 5.5,
  SIX: 6,
});

export const MATCH_PRIZE = Object.freeze({
  [MATCH_KEY.THREE]: 5_000,
  [MATCH_KEY.FOUR]: 50_000,
  [MATCH_KEY.FIVE]: 1_500_000,
  [MATCH_KEY.FIVE_AND_BONUS]: 30_000_000,
  [MATCH_KEY.SIX]: 2_000_000_000,
});
