import deepFreeze from '../utils/deepFreeze';

const values = Object.freeze({
  LOWER_BOUND: 1,
  UPPER_BOUND: 45,
  LOTTO_PRICE: 1000,
  LOTTO_LENGTH: 6,
  YES: 'y',
  NO: 'n',
});

const correctCountsToMoney = deepFreeze({
  6: { rank: 1, prize: 2000000000 },
  5: [
    { rank: 2, prize: 30000000 },
    { rank: 3, prize: 1500000 },
  ],
  4: { rank: 4, prize: 50000 },
  3: { rank: 5, prize: 5000 },
  2: { rank: 6, prize: 0 },
  1: { rank: 6, prize: 0 },
  0: { rank: 6, prize: 0 },
});

const prize = [2000000000, 30000000, 1500000, 50000, 5000, 0];

const regex = Object.freeze({
  POSITIVE_INTEGER: /^[1-9]\d*$/,
});

export { values, correctCountsToMoney, regex, prize };
