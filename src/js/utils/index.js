const {
  CORRECT_COUNT_PER_RANK,
  INDEX_TO_KEY_CONVERTER,
  PROFIT,
  REGEX,
} = require('../js/constants/constants');

const showStatistics = (rank, correctCount) => {
  return `${CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]]}개 일치${
    rank === 2 ? ', 보너스 볼 일치' : ''
  } (${PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]]
    .toString()
    .replace(REGEX.PRICE_FORMAT, ',')}원) - ${correctCount}개`;
};

module.exports = { showStatistics };
