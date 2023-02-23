import deepFreeze from '../utils/deepFreeze';

const VALUES = Object.freeze({
  LOWER_BOUND: 1,
  UPPER_BOUND: 45,
  LOTTO_PRICE: 1000,
  LOTTO_LENGTH: 6,
  YES: 'y',
  NO: 'n',
  WINNING_NUMBER_COUNT: 6,
});

const MATCH_COUNT_TO_RANK = deepFreeze({
  6: { rank: 1 },
  5: [{ rank: 2 }, { rank: 3 }],
  4: { rank: 4 },
  3: { rank: 5 },
  2: { rank: 6 },
  1: { rank: 6 },
  0: { rank: 6 },
});

const PRIZE = Object.freeze([2000000000, 30000000, 1500000, 50000, 5000, 0]);

const REGEX = Object.freeze({
  POSITIVE_INTEGER: /^[1-9]\d*$/,
});

export { VALUES, MATCH_COUNT_TO_RANK, REGEX, PRIZE };
