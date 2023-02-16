const ALL_LOTTO_NUMBERS = Array.from({ length: 45 }, (_, idx) => idx + 1);

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

module.exports = {
  ALL_LOTTO_NUMBERS,
  RANK,
  LOTTO_PRIZE,
};
