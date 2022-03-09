export const LOTTO_NUMBERS = Object.freeze({
  LOTTO_PRICE: 1000,
  CAN_BUY_MAX_PRICE: 100000,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6,
  WINNING_LOTTO_LENGTH: 7,
});

export const ALERT_MESSAGE = Object.freeze({
  MUST_NUMBER: '숫자를 입력하세요.',
  OVER_THOUSAND_INPUT: '1000원 이상을 입력해주세요.',
  DIVIDED_BY_THOUSAND: '1000으로 나누어 떨어지는 값을 입력해주세요',
  OUT_OF_RANGE: '1 ~ 45 사이의 숫자를 입력해주세요.',
  DUPLICATED_NUMBERS: '중복되지 않은 숫자를 입력해주세요.',
  IS_OVER_MAX_LOTTO_COUNT: '로또는 100개까지만 구매가능합니다.',
  IS_NOT_INPUT_ALL: '당첨번호가 모두 입력되지 않았습니다.',
});
