const MIN_LOTTO_NUMBER = 1;
const MAX_LOTTO_NUMBER = 45;
const LOTTO_NUMBERS_COUNT = 6;
const ALL_LOTTO_NUMBERS = Array.from(
  { length: MAX_LOTTO_NUMBER },
  (_, idx) => idx + 1
);

const LOTTO_UNIT_PRICE = 1000;

const RANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  NONE: 6,
};

const LOTTO_PRIZE = [
  {
    CONDITION: '6개 일치',
    MONEY: 2_000_000_000,
  },
  {
    CONDITION: '5개 일치, 보너스 볼 일치',
    MONEY: 30_000_000,
  },
  {
    CONDITION: '5개 일치',
    MONEY: 1_500_000,
  },
  {
    CONDITION: '4개 일치',
    MONEY: 50_000,
  },
  {
    CONDITION: '3개 일치',
    MONEY: 5_000,
  },
  {
    CONDITION: 'NONE',
    MONEY: 0,
  },
];

const RESTART_COMMAND = 'y';
const QUIT_COMMAND = 'n';

module.exports = {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBERS_COUNT,
  ALL_LOTTO_NUMBERS,
  LOTTO_UNIT_PRICE,
  RANK,
  LOTTO_PRIZE,
  RESTART_COMMAND,
  QUIT_COMMAND,
};
