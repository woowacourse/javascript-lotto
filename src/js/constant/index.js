export const ERROR_MESSAGE = Object.freeze({
  LACK_FARE: '요금은 1000원 이상 투입해주세요!',
  INVALID_RANGE_WINNING_NUMBERS: '당첨 번호는 1 ~ 45 사이의 숫자를 입력해주세요.',
  OVERLAPPED_WINNING_NUMBERS:
    '당첨 번호에는 중복되는 숫자가 있으면 안됩니다.\n중복되는 숫자가 있는지 확인해주세요.',
  INVALID_COUNT_WINNING_NUMBERS: '당첨 번호에는 6개의 숫자를 입력해주세요.',
});

export const LOTTO_PRICE = 1000;

export const LOTTO_RULES = {
  MIN_RANGE: 1,
  MAX_RANGE: 45,
  BALL_COUNT: 6,
};
