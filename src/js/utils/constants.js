export const LOTTO_NUMBERS = {
  LOTTO_UNIT: 1000,
  LOTTO_MAX_NUM: 45,
  WINNING_NUMBER_COUNT: 7,
  MIN_PURCHASE_LIMIT: 1000,
  MAX_PURCHASE_LIMIT: 100000,
};

// key: 등수, value: 당첨금
export const LOTTO_WINNING_PRICE = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

export const ALERT_MESSAGES = {
  INCORRECT_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  DUPLICATE_NUMS: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};
