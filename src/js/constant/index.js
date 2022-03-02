export const LOTTO_PRICE = 1000;

export const LOTTO_RULES = Object.freeze({
  MIN_RANGE: 1,
  MAX_RANGE: 45,
  BALL_COUNT: 6,
  NUMBER_MAX_LENGTH: 2,
});

export const ERROR_MESSAGE = Object.freeze({
  LACK_OF_FARE: `요금은 ${LOTTO_PRICE}원 이상 투입해주세요!`,
});
