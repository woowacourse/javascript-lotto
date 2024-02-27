class LottoResult {
  #lottoRules;
  #resultBoard = {};

  constructor(lottoRules) {
    this.#lottoRules = lottoRules;
    lottoRules.getRankInfo().forEach((rank) => {
      this.#resultBoard[rank] = 0;
    });
  }

  generateResultBoard(lottos, winningLotto) {
    const { winningNumber, bonusNumber } = winningLotto.getWinningInfo();

    lottos.forEach((lotto) => {
      const { matchedCount, hasBonusNumber } = lotto.getMatchedInfo(
        winningNumber,
        bonusNumber
      );
      const lottoRank = this.#getLottoRank({ matchedCount, hasBonusNumber });
      this.#updateResultBoard(lottoRank);
    });

    return { ...this.#resultBoard };
  }

  calculateReturnRate(amount) {
    const totalReward = this.#calculateTotalReward();
    const returnRate = Number(((totalReward / amount) * 100).toFixed(2));

    return returnRate;
  }

  #getLottoRank({ matchedCount, hasBonusNumber }) {
    return this.#lottoRules.checkRank({ matchedCount, hasBonusNumber });
  }

  #updateResultBoard(rank) {
    this.#resultBoard[rank] += 1;
  }

  #calculateTotalReward() {
    const ranks = Object.keys(this.#resultBoard);
    return ranks.reduce(
      (accReward, currRank) =>
        accReward +
        this.#resultBoard[currRank] * this.#lottoRules.checkReward(currRank),
      0
    );
  }
}

export default LottoResult;
