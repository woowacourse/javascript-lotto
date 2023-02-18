import deepFreeze from '../utils/deepFreeze';

const values = Object.freeze({
  LOWER_BOUND: 1,
  UPPER_BOUND: 45,
  LOTTO_PRICE: 1000,
  LOTTO_LENGTH: 6,
  YES: 'y',
  NO: 'n',
});

const matchCountsToRank = deepFreeze({
  6: { rank: 1 },
  5: [{ rank: 2 }, { rank: 3 }],
  4: { rank: 4 },
  3: { rank: 5 },
  2: { rank: 6 },
  1: { rank: 6 },
  0: { rank: 6 },
});

const prize = Object.freeze([2000000000, 30000000, 1500000, 50000, 5000, 0]);

const regex = Object.freeze({
  POSITIVE_INTEGER: /^[1-9]\d*$/,
});

export { values, matchCountsToRank, regex, prize };
