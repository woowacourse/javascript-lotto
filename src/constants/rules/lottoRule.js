const LOTTO_RULE = Object.freeze({
  NUMBER_DELIMITER: ',',
  LOTTO_MONEY_UNIT: 1000,
  RANDOM_NUMBER_FROM: 1,
  RANDOM_NUMBER_TO: 45,
  LOTTO_LENGTH: 6,
  LOTTO_RESTART: 'y',
  LOTTO_EXIT: 'n',
  PRIZE: [2000000000, 30000000, 1500000, 50000, 5000],
  RANKS: {
    FIRST: { RANK: 'first', MATCH_COUNT: 6 },
    SECOND: { RANK: 'second', MATCH_COUNT: 5 },
    THIRD: { RANK: 'third', MATCH_COUNT: 5 },
    FOURTH: { RANK: 'fourth', MATCH_COUNT: 4 },
    FIFTH: { RANK: 'fifth', MATCH_COUNT: 3 },
  },
});

export default LOTTO_RULE;
