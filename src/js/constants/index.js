export const LOTTO_NUMBERS = Object.freeze({
  LOTTO_PRICE: 1000,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6,
  MAX_LOTTO_COUNT: 100,
  FIRST_WINNINGS: 2000000000,
  SECOND_WINNINGS: 30000000,
  THIRD_WINNINGS: 1500000,
  FOURTH_WINNINGS: 50000,
  FIFTH_WINNINGS: 5000,
});

export const ALERT_MESSAGE = Object.freeze({
  MUST_NUMBER: '숫자를 입력하세요.',
  OVER_THOUSAND_LOTTO_PRICE: '1000원 이상을 입력해주세요.',
  DIVIDED_BY_LOTTO_PRICE: '1000으로 나누어 떨어지는 값을 입력해주세요',
  OUT_OF_BOUNDS: '1 ~ 45 사이의 숫자를 입력해주세요.',
  DUPLICATED_NUMBERS: '중복되지 않은 숫자를 입력해주세요.',
  OVER_MAX_LOTTO_COUNT: '로또는 100개이하만 구매할수 있습니다',
  EMPTY_INPUT: '빈칸없이 입력해주세요',
});
