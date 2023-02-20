const {
  CORRECT_COUNT_PER_RANK,
  INDEX_TO_KEY_CONVERTER,
  PROFIT,
  PROFIT_PER_RANK,
  REGEX,
} = require('../constants/constants');

const calculateProfit = (rank) => {
  if (rank === undefined) return 0;

  const rankIndex = rank - 1;

  return PROFIT_PER_RANK[rankIndex];
};

const showStatistics = (rank, correctCount) => {
  return `${CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]]}개 일치${
    rank === 2 ? ', 보너스 볼 일치' : ''
  } (${PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]]
    .toString()
    .replace(REGEX.PRICE_FORMAT, ',')}원) - ${correctCount}개`;
};

module.exports = { calculateProfit, showStatistics };
