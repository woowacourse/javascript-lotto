class LottoRankCalculator {
  static calculateLottoRanks(lottos, winningLottoAndBonusNumber) {
    const ranks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    lottos.forEach((lotto) => {
      const rank = winningLottoAndBonusNumber.calculateRank(lotto);
      ranks[rank] += 1;
    });

    return ranks;
  }
}

export default LottoRankCalculator;
