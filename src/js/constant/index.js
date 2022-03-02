export const LOTTO_PRICE = 1000;

export const LOTTO_RULES = Object.freeze({
  MIN_RANGE: 1,
  MAX_RANGE: 45,
  BALL_COUNT: 6,
  NUMBER_MAX_LENGTH: 2,
});

export const ERROR_MESSAGE = Object.freeze({
  LACK_OF_FARE: `요금은 ${LOTTO_PRICE}원 이상 투입해주세요!`,
  WINNING_NUMBER_IS_NOT_NUMBER: '당첨 번호는 숫자만 입력해주세요!',
  OUT_OF_RANGE_WINNING_NUMBER: `당첨 번호는 ${LOTTO_RULES.MIN_RANGE}이상 ${LOTTO_RULES.MAX_RANGE}이하로 입력해주세요!`,
  OVERLAPPED_WINNING_NUMBER: '당첨 번호는 중복된 숫자 없이 입력해주세요!',
  EMPTY_OF_LOTTO: '로또를 먼저 구매해주세요!',
});
