const GAME_COMMAND = {
  YES: 'y',
  No: 'n',
};

const LOTTO = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
  PRICE: 1_000,
};

const LOTTO_RANK = {
  FIRST: {
    PRIZE: 2_000_000_000,
    MATCHED_NUMBERS: 6,
  },
  SECOND: {
    PRIZE: 30_000_000,
    MATCHED_NUMBERS: 5,
  },
  THIRD: {
    PRIZE: 1_500_000,
    MATCHED_NUMBERS: 5,
  },
  FOURTH: {
    PRIZE: 50_000,
    MATCHED_NUMBERS: 4,
  },
  FIFTH: {
    PRIZE: 5_000,
    MATCHED_NUMBERS: 3,
  },
};

export { GAME_COMMAND, LOTTO, LOTTO_RANK };
