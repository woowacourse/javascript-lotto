const { profitByRank } = require('../constants/constants');

const calculateProfit = (rank) => {
  if (rank === undefined) return 0;

  const rankIndex = rank - 1;

  return profitByRank[rankIndex];
};

module.exports = { calculateProfit };
