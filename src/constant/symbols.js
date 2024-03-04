export const GAME_SYMBOL = {
  ERROR: '[ERROR]',
  RESTART: 'y',
  EXIT: 'n',
  INPUT: '>',
  DASH: '-',
};

export const PURCHASE_SYMBOL = {
  UNIT: 1000,
  RANGE_MIN: 1000,
};

export const LOTTO_SYMBOL = {
  COUNT: 6,
  RANGE_MIN: 1,
  RANGE_MAX: 45,
  PRIZE: {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  },
  MATCH_COUNT_PER_RANK: {
    1: '6개',
    2: '5개+보너스볼',
    3: '5개',
    4: '4개',
    5: '3개',
  },
};
