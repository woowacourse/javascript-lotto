const { RANK, LOTTO } = require('../constant/setting');

const calculateTotalRewards = (ranking) =>
  Object.entries(ranking).reduce((acc, [rank, count]) => acc + RANK[rank].REWARDS * count, 0);

const calculateProfitRate = (ranking, lottoQuantity) =>
  (calculateTotalRewards(ranking) * 100) / (lottoQuantity * LOTTO.UNIT);

module.exports = calculateProfitRate;
