const LOTTO_STRING = Object.freeze({
  LOTTO_NUMBER: '로또 번호',
  BUDGET: '구입 금액',
  BONUS_NUMBER: '보너스 번호',
});

const ERROR_MESSAGE = Object.freeze({
  NOT_INTEGER: (subject) => `${subject}는 숫자여야 합니다`,
  LOTTO_NUMBER_RANGE: (subject) => `${subject}는 1~45 사이의 숫자여야 합니다.`,
  LOTTO_NUMBER_DUPLICATE: (subject) => `${subject}는 중복될 수 없습니다.`,
  BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE:
    '[ERROR] 구입 금액은 로또 가격으로 나뉘어 떨어져야 합니다.',
  BUDGET_LESS_THAN_LOTTO_PRICE: '[ERROR] 구입 금액은 로또 가격보다 커야 합니다',
});

export { ERROR_MESSAGE, LOTTO_STRING };
