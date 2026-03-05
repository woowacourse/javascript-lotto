class LottoRankCalculator {
  static calculateLottoRank(lotto, winningNumbers, bonusNumber) {
    const rank = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const matchCount = lotto.matchCount(winningNumbers);
    if (matchCount === 6) {
      rank[1]++;
    } else if (matchCount === 5 && lotto.includes(bonusNumber)) {
      rank[2]++;
    } else if (matchCount === 5) {
      rank[3]++;
    } else if (matchCount === 4) {
      rank[4]++;
    } else if (matchCount === 3) {
      rank[5]++;
    }

    return rank;
  }
}

export default LottoRankCalculator;
