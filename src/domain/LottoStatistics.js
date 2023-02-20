const { RANK, LOTTO_PRIZE, LOTTO } = require('./constants/index');

const LOTTO_RANK = {
  6: RANK.FIRST,
  4: RANK.FOURTH,
  3: RANK.FIFTH,
};

class LottoStatistics {
  #correctLotto;

  constructor(correctLotto) {
    this.#correctLotto = correctLotto;
  }

  getAllLottosRank(lottos) {
    return lottos.reduce(
      (acc, lotto) => {
        acc[this.determineLottoRank(lotto) - 1] += 1;
        return acc;
      },
      [0, 0, 0, 0, 0, 0]
    );
  }

  determineLottoRank(lotto) {
    const matchCount = lotto.calculateMatchCount(
      this.#correctLotto.winningNumbers
    );

    return this.getLottoRank(lotto, matchCount);
  }

  getLottoRank(lotto, matchCount) {
    if (matchCount === 5) {
      return lotto.matchBonus(this.#correctLotto.bonusNumber)
        ? RANK.SECOND
        : RANK.THIRD;
    }

    return LOTTO_RANK[matchCount] ?? LOTTO.count;
  }

  getProfitRate(winningLottos, purchasePrice) {
    return (
      (winningLottos.reduce(
        (acc, cur, idx) => acc + LOTTO_PRIZE[idx].MONEY * cur,
        0
      ) /
        purchasePrice) *
      100
    ).toFixed(1);
  }
}

module.exports = LottoStatistics;
