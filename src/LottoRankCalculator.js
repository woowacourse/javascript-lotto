class LottoRankCalculator {
  static calculateLottoRanks(lottos, winningNumbers, bonusNumber) {
    const ranks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    lottos.forEach((lotto) => {
      const rank = LottoRankCalculator.calculateLottoRank(
        lotto,
        winningNumbers,
        bonusNumber,
      );

      ranks[rank] += 1;
    });

    return ranks;
  }

  static calculateLottoRank(lotto, winningNumbers, bonusNumber) {
    const matchCount = lotto.matchCount(winningNumbers);
    if (matchCount === 6) {
      return 1;
    } else if (matchCount === 5 && lotto.includes(bonusNumber)) {
      return 2;
    } else if (matchCount === 5) {
      return 3;
    } else if (matchCount === 4) {
      return 4;
    } else if (matchCount === 3) {
      return 5;
    }
    return 6;
  }
}

export default LottoRankCalculator;
