<<<<<<< HEAD
const SEPARATOR = ',';
=======
const SEPARATOR = Object.freeze(',');
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

const KEY = Object.freeze({
  PURCHASE_PRICE: '구입 금액',
  WINNING_NUMBERS: '당첨 번호',
  BONUS_NUMBER: '보너스 번호',
<<<<<<< HEAD
  LOTTO_NUMBERS: '로또 번호',
=======
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
});

const PURCHASE_PRICE = Object.freeze({
  MIN: 1000,
  MAX: 1000000,
  UNIT: 1000,
});

const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
});

const RESTART = Object.freeze({
  YES: 'y',
  NO: 'n',
});

const PROFIT = Object.freeze([5000, 50000, 1500000, 30000000, 2000000000]);

export { SEPARATOR, KEY, PURCHASE_PRICE, LOTTO, RESTART, PROFIT };
