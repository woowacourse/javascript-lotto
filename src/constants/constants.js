const PRICE_UNIT = 1_000;
const BLANK_REGEXP = /\s/;
const RESTART_COMMAND_REGEXP = /y|n/;
const EMPTY_STRING = '';
const LOTTO_NUMBER_COUNT = 6;

const lottoNumberRange = Object.freeze({
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
});

const profit = Object.freeze({
  FIRST_RANK: 2_000_000_000,
  SECOND_RANK: 30_000_000,
  THIRD_RANK: 1_500_000,
  FOURTH_RANK: 50_000,
  FIFTH_RANK: 5_000,
});

const profitByRank = Object.freeze([
  profit.FIRST_RANK,
  profit.SECOND_RANK,
  profit.THIRD_RANK,
  profit.FOURTH_RANK,
  profit.FIFTH_RANK,
]);

module.exports = {
  PRICE_UNIT,
  BLANK_REGEXP,
  RESTART_COMMAND_REGEXP,
  EMPTY_STRING,
  lottoNumberRange,
  profit,
  profitByRank,
  LOTTO_NUMBER_COUNT,
};
