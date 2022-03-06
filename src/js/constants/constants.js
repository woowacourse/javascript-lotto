export const ERROR_MESSAGE = {
  NEGATIVE_INPUT: '입력한 금액이 양수가 아닙니다.',
  NOT_INTEGER_INPUT: '입력한 금액이 자연수가 아닙니다.',
  TOO_BIG_INPUT: '100개 이상의 로또를 한 번에 구매할 수는 없습니다.',
  TOO_SMALL_INPUT: '로또 한 장의 가격은 1000원입니다.',
  WINNINGS_NO_EMPTY: '당첨 번호는 비워둘 수 없습니다.',
  WINNGINGS_NO_OVERLAPPED: '당첨 번호는 중복될 수 없습니다.',
  WINNINGS_COVERAGE: '당첨 번호를 1~45까지의 자연수로 입력해주세요.',
};

export const CONDITIONS = {
  LOTTO_SIZE: 6,
  LOTTO_NUM_MIN: 1,
  LOTTO_NUM_MAX: 45,
  LOTTO_PRICE: 1000,
};

export const WINNINGS = {
  '5-place': 5000,
  '4-place': 50000,
  '3-place': 1500000,
  '2-place': 30000000,
  '1-place': 2000000000,
};
