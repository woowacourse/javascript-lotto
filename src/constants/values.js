export const BONUS = 'BONUS';
export const FIRST_PLACE = 6;
export const SECOND_PLACE = BONUS;
export const THIRD_PLACE = 5;
export const FOURTH_PLACE = 4;
export const FIFTH_PLACE = 3;
export const RETRY = 'y';
export const EXIT = 'n';
export const UNIT = 1000;
export const LOTTO_COUNT = 6;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const AWARDS_ORDER = [FIFTH_PLACE, FOURTH_PLACE, THIRD_PLACE, SECOND_PLACE, FIRST_PLACE];
export const INITIAL_EARNING = 0;
export const PRICE = 1000;
export const SPLITTER = ',';
export const NUMBER_MERGER = ', ';
export const LOTTO_MERGER = '\n';
export const PRIZE = Object.freeze({
  [FIFTH_PLACE]: 5_000,
  [FOURTH_PLACE]: 50_000,
  [THIRD_PLACE]: 1_500_000,
  [SECOND_PLACE]: 30_000_000,
  [FIRST_PLACE]: 2_000_000_000,
});
