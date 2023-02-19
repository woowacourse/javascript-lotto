const {
  correctCountPerRank,
  indexToRankKeyConverter,
  profit,
  profitByRank,
  regex,
} = require('../constants/constants');

const calculateProfit = (rank) => {
  if (rank === undefined) return 0;

  const rankIndex = rank - 1;

  return profitByRank[rankIndex];
};

const showStatistics = (rank, correctCount) => {
  return `${correctCountPerRank[indexToRankKeyConverter[rank - 1]]}개 일치${
    rank === 2 ? ', 보너스 볼 일치' : ''
  } (${profit[indexToRankKeyConverter[rank - 1]]
    .toString()
    .replace(regex.PRICE_FORMAT, ',')}원) - ${correctCount}개`;
};

module.exports = { calculateProfit, showStatistics };
