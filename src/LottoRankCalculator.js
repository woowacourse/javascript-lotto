class LottoRankCalculator {
  static calculateLottoRank(lottos, winningNumbers, bonusNumber) {
    // {1등: 6개 일치, 2등: 5개 + 보너스 번호 일치, 3등: 5개 일치, 4등: 4개 일치, 5등: 3개 일치, 꽝: 그 외}
    const rank = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    lottos.forEach((lotto) => {
      const matchCount = lotto.matchCount(winningNumbers);
      if (matchCount === 6) {
        return rank[1]++;
      }
      if (matchCount === 5 && lotto.includes(bonusNumber)) {
        return rank[2]++;
      }
      if (matchCount === 5) {
        return rank[3]++;
      }
      if (matchCount === 4) {
        return rank[4]++;
      }
      if (matchCount === 3) {
        return rank[5]++;
      }
      rank[6]++;
    });

    return rank;
  }
}

export default LottoRankCalculator;
