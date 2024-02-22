class LottoResult {
  #rankBoard;

  static #LOTTO_REWARDS = {
    first: 2_000_000_000,
    second: 30_000_000,
    third: 1_500_000,
    fourth: 50_000,
    fifth: 5_000,
  };

  static #MATCHED_COUNT = {
    six: 6,
    five: 5,
    four: 4,
    three: 3,
  };

  constructor() {
    this.#rankBoard = {
      first: {
        reward: LottoResult.#LOTTO_REWARDS.first,
        rule: LottoResult.#MATCHED_COUNT.six,
        matchedCount: 0,
      },
      second: {
        reward: LottoResult.#LOTTO_REWARDS.second,
        rule: LottoResult.#MATCHED_COUNT.five,
        matchedCount: 0,
      },
      third: {
        reward: LottoResult.#LOTTO_REWARDS.third,
        rule: LottoResult.#MATCHED_COUNT.five,
        matchedCount: 0,
      },
      fourth: {
        reward: LottoResult.#LOTTO_REWARDS.fourth,
        rule: LottoResult.#MATCHED_COUNT.four,
        matchedCount: 0,
      },
      fifth: {
        reward: LottoResult.#LOTTO_REWARDS.fifth,
        rule: LottoResult.#MATCHED_COUNT.three,
        matchedCount: 0,
      },
    };
  }

  #getLottoRank(matchedCount, hasBonusNumber) {
    if (matchedCount === LottoResult.#MATCHED_COUNT.six) return "first";
    if (matchedCount === LottoResult.#MATCHED_COUNT.five && hasBonusNumber)
      return "second";
    if (matchedCount === LottoResult.#MATCHED_COUNT.five) return "third";
    if (matchedCount === LottoResult.#MATCHED_COUNT.four) return "fourth";
    if (matchedCount === LottoResult.#MATCHED_COUNT.three) return "fifth";
    return "nothing";
  }

  #updateRankBoard(rank) {
    if (rank === "nothing") {
      return;
    }

    this.#rankBoard[rank].matchedCount += 1;
  }

  #calculateTotalReward() {
    const ranks = Object.keys(this.#rankBoard);

    return ranks.reduce(
      (accReward, currRank) =>
        accReward +
        this.#rankBoard[currRank].matchedCount *
          LottoResult.#LOTTO_REWARDS[currRank],
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

  calculateReturnRate(amount) {
    const totalReward = this.#calculateTotalReward();
    console.log(totalReward);
    const returnRate = Number(
      Math.ceil((totalReward / amount) * 100).toFixed(2)
    );

    return returnRate;
  }

  getRankBoard() {
    return { ...this.#rankBoard };
  }
}

export default LottoResult;
