const SEPARATOR = ",";

const KEY = Object.freeze({
  PURCHASE_PRICE: "구입 금액",
  WINNING_NUMBERS: "당첨 번호",
  BONUS_NUMBER: "보너스 번호",
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
  YES: "y",
  NO: "n",
});

const PROFIT = Object.freeze({
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
});

export { SEPARATOR, KEY, PURCHASE_PRICE, LOTTO, RESTART, PROFIT };
