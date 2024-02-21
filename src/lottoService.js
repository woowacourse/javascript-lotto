const lottoService = {
  pickLottoRank(matchedResult) {
    const MATCHED_RANK_COUNT = { 0: 6, 1: 6, 2: 6, 3: 5, 4: 4, 6: 1 };
    const { matchedCount, isBonusMatched } = matchedResult;
    if (matchedCount !== 5) return MATCHED_RANK_COUNT[matchedCount];
    return isBonusMatched ? 2 : 3;
  },

  calculateProfit(matchedResultList, purchaseAmount) {
    const rankList = matchedResultList.map(matchedResult => this.pickLottoRank(matchedResult));
    const PRIZE = { 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000, 6: 0 };
    const totalPrice = rankList.reduce((acc, rank) => acc + PRIZE[rank], 0);
    return ((totalPrice / purchaseAmount) * 100).toFixed(1);
  },
};

export default lottoService;
