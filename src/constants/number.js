const NUMBER = Object.freeze({
  LOTTO_PRICE: 1000,
  LOTTO_START_NUMBER: 1,
  LOTTO_END_NUMBER: 45,
  LOTTO_LENGTH: 6,
});

const WINNER = Object.freeze({
  FIRST: {
    PRICE: 2_000_000_000,
    MATCH_COUNT: 6,
    INDEX: 0,
  },
  SECOND: {
    PRICE: 30_000_000,
    MATCH_COUNT: 5,
    INDEX: 1,
  },
  THIRD: {
    PRICE: 1_500_000,
    MATCH_COUNT: 5,
    INDEX: 2,
  },
  FOURTH: {
    PRICE: 50_000,
    MATCH_COUNT: 4,
    INDEX: 3,
  },
  FIFTH: {
    PRICE: 5_000,
    MATCH_COUNT: 3,
    INDEX: 4,
  },
});

export { NUMBER, WINNER };
