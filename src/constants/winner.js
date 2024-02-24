const WINNER = Object.freeze({
  FIRST: Object.freeze({
    PRICE: 2_000_000_000,
    MATCH_COUNT: 6,
    INDEX: 0,
    IS_BONUS: false,
  }),
  SECOND: Object.freeze({
    PRICE: 30_000_000,
    MATCH_COUNT: 5,
    INDEX: 1,
    IS_BONUS: true,
  }),
  THIRD: Object.freeze({
    PRICE: 1_500_000,
    MATCH_COUNT: 5,
    INDEX: 2,
    IS_BONUS: false,
  }),
  FOURTH: Object.freeze({
    PRICE: 50_000,
    MATCH_COUNT: 4,
    INDEX: 3,
    IS_BONUS: false,
  }),
  FIFTH: Object.freeze({
    PRICE: 5_000,
    MATCH_COUNT: 3,
    INDEX: 4,
    IS_BONUS: false,
  }),
});

export default WINNER;
