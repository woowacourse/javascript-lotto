export const GAME = Object.freeze({
  RETRY: 'y',
  EXIT: 'n',
  SPLITTER: ',',
  NUMBER_MERGER: ', ',
  LOTTO_MERGER: '\n',
});

export const LOTTO = Object.freeze({
  LOTTO_COUNT: 6,
  LOTTO_MIN_NUMBER: 1,
  LOTTO_MAX_NUMBER: 45,
  PRICE: 1000,
  UNIT: 1000,
});

export const AWARDS = Object.freeze({
  BONUS: '5개 + 보너스 볼',
  FIRST_PLACE: 6,
  SECOND_PLACE: '5개 + 보너스 볼',
  THIRD_PLACE: 5,
  FOURTH_PLACE: 4,
  FIFTH_PLACE: 3,
  INITIAL_EARNING: 0,
});

export const AWARDS_ORDER = Object.freeze([
  AWARDS.FIFTH_PLACE,
  AWARDS.FOURTH_PLACE,
  AWARDS.THIRD_PLACE,
  AWARDS.SECOND_PLACE,
  AWARDS.FIRST_PLACE,
]);

export const PRIZE = Object.freeze({
  [AWARDS.FIFTH_PLACE]: 5_000,
  [AWARDS.FOURTH_PLACE]: 50_000,
  [AWARDS.THIRD_PLACE]: 1_500_000,
  [AWARDS.SECOND_PLACE]: 30_000_000,
  [AWARDS.FIRST_PLACE]: 2_000_000_000,
});
