class LottoResult {
  #rankBoard;

  static #LOTTO_REWARDS = {
    first: 2_000_000_000,
    second: 30_000_000,
    third: 1_500_000,
    fourth: 50_000,
    fifth: 5_000,
  };

  constructor() {
    this.#rankBoard = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }

  #getLottoRank(matchedCount, hasBonusNumber) {
    if (matchedCount === 6) return "first";
    if (matchedCount === 5 && hasBonusNumber) return "second";
    if (matchedCount === 5) return "third";
    if (matchedCount === 4) return "fourth";
    if (matchedCount === 3) return "fifth";
    return "nothing";
  }

  #updateRankBoard(rank) {
    if (rank === "nothing") {
      return;
    }

    this.#rankBoard[rank] += 1;
  }

  #calculateTotalReward() {
    const ranks = Object.keys(this.#rankBoard);

    return ranks.reduce(
      (accReward, currRank) =>
        accReward +
        this.#rankBoard[currRank] * LottoResult.#LOTTO_REWARDS[currRank],
      0
    );
  }

  generateResult(lottos, winningInfo) {
    const { answer, bonusNumber } = winningInfo.getWinningInfo();

    lottos.forEach((lotto) => {
      const { matchedCount, hasBonusNumber } = lotto.getMatchedInfo(
        answer,
        bonusNumber
      );
      const lottoRank = this.#getLottoRank(matchedCount, hasBonusNumber);
      this.#updateRankBoard(lottoRank);
    });
  }

  calculateReturnRate(lottosCount) {
    const totalReward = this.#calculateTotalReward();
    const returnRate = Number(
      Math.ceil((totalReward / lottosCount) * 100).toFixed(2)
    );

    return returnRate;
  }

  getRankBoard() {
    return { ...this.#rankBoard };
  }
}

export default LottoResult;
