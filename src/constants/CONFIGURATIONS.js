const SEPARATOR = ',';

const KEY = Object.freeze({
  PURCHASE_PRICE: '구입 금액',
  PURCHASE_COUNT: '로또 구매 개수',
  WINNING_NUMBERS: '당첨 번호',
  BONUS_NUMBER: '보너스 번호',
});

const PURCHASE_PRICE = Object.freeze({
  MIN: 1000,
  MAX: 1000000,
  UNIT: 1000,
});

const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_LENGTH: 6,
});

const RESTART = Object.freeze({
  YES: 'y',
  NO: 'n',
});

const PROFIT = Object.freeze([5000, 50000, 1500000, 30000000, 2000000000]);

const LOTTO_COUNT = Object.freeze(['3', '4', '5', '5', '6']);

export { SEPARATOR, KEY, PURCHASE_PRICE, LOTTO, RESTART, PROFIT, LOTTO_COUNT };
