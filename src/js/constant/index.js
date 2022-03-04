export const ERROR_MESSAGE = Object.freeze({
  LACK_FARE: '요금은 1000원 이상 투입해주세요!',
  INVALID_RANGE_WINNING_NUMBERS: '당첨 번호는 1 ~ 45 사이의 숫자를 입력해주세요.',
  OVERLAPPED_WINNING_NUMBERS:
    '당첨 번호에는 중복되는 숫자가 있으면 안됩니다.\n중복되는 숫자가 있는지 확인해주세요.',
  INVALID_COUNT_WINNING_NUMBERS: '당첨 번호에는 6개의 숫자를 입력해주세요.',
  INCLUDED_IN_WINNING_NUMBERS: '보너스 번호는 당첨 번호에 없는 숫자로 입력해 주세요.',
  INVALID_RANGE_BONUS_NUMBER: '보너스 번호는 1 ~ 45 사이의 숫자를 입력해 주세요',
});

export const LOTTO_PRICE = 1000;

export const LOTTO_RULES = {
  MIN_RANGE: 1,
  MAX_RANGE: 45,
  BALL_COUNT: 6,
  MAX_RANK: 5,
};

export const WINNING_CRITERIA = ['3개', '4개', '5개', '5개 + 보너스볼', '6개'];
export const PRIZE_MONEY = [5000, 50000, 1500000, 30000000, 2000000000];
