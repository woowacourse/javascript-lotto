import deepFreeze from '../utils/deepFreeze';

const values = Object.freeze({
  LOWER_BOUND: 1,
  UPPER_BOUND: 45,
});

const correctCountsToMoney = deepFreeze({
  6: 2000000000,
  5: [30000000, 1500000],
  4: 50000,
  3: 5000,
  2: 0,
  1: 0,
  0: 0,
});

export { values, correctCountsToMoney };
