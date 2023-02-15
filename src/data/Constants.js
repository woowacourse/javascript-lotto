const LOTTO_CONSTANT = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
  PRICE: 1000,
  LOTTO_NUMBER: '로또 번호',
  BUDGET: '구입 금액',
  BONUS_NUMBER: '보너스 번호',
});

const LOTTO_RANKING = Object.freeze({
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
  FOURTH: 'fourth',
  FIFTH: 'fifth',
});

const MATCHES_COUNT_TO_RANKING = Object.freeze({
  6: 'first',
  5: 'third',
  4: 'fourth',
  3: 'fifth',
  2: 'fail',
  1: 'fail',
  0: 'fail',
});

const RANKING_TO_MATCHES_COUNT = Object.freeze({
  first: 6,
  third: 5,
  fourth: 4,
  fifth: 3,
});

const ERROR_MESSAGE = Object.freeze({
  NOT_INTEGER: (subject) => `${subject}는 숫자여야 합니다`,
  LOTTO_NUMBER_RANGE: (subject) => `${subject}는 1~45 사이의 숫자여야 합니다.`,
  LOTTO_NUMBER_DUPLICATE: (subject) => `${subject}는 중복될 수 없습니다.`,
  BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE:
    '[ERROR] 구입 금액은 로또 가격으로 나뉘어 떨어져야 합니다.',
  BUDGET_LESS_THAN_LOTTO_PRICE: '[ERROR] 구입 금액은 로또 가격보다 커야 합니다',
});

export {
  ERROR_MESSAGE,
  LOTTO_CONSTANT,
  LOTTO_RANKING,
  MATCHES_COUNT_TO_RANKING,
  RANKING_TO_MATCHES_COUNT,
};
