import CONFIG from '../../constants/config';

const lottoService = {
  calculateProfit(matchedResultList, purchaseAmount) {
    const rankCounts = this.calculateRankCounts(matchedResultList);
    const totalPrice = Array.from({ length: CONFIG.LOTTO_RANK_LENGTH }, (_, i) => i + 1).reduce(
      (acc, rank) => acc + rankCounts[rank] * CONFIG.PRIZE[rank],
      0,
    );

    return ((totalPrice / purchaseAmount) * 100).toFixed(CONFIG.PROFIT_DECIMAL_PLACE);
  },

  calculateRankCounts(matchedResultList) {
    const rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    matchedResultList.forEach(matchedResult => {
      const rank = this.pickLottoRank(matchedResult);
      rankCounts[rank] += 1;
    });
    return rankCounts;
  },

  pickLottoRank(matchedResult) {
    const { matchedCount, isBonusMatched } = matchedResult;
    if (matchedCount === CONFIG.SECOND_PRIZE_CONDITION) {
      return isBonusMatched ? CONFIG.SECOND_PRIZE : CONFIG.THIRD_PRIZE;
    }
    return CONFIG.MATCHED_RANK_COUNT[matchedCount];
  },
};

export default lottoService;
