const { RANK, LOTTO_PRIZE } = require('./constants/index');

const LOTTO_RANK = {
  6: RANK.FIRST,
  5: (isBonus) => (isBonus ? RANK.SECOND : RANK.THIRD),
  4: RANK.FOURTH,
  3: RANK.FIFTH,
};

class LottoStatistics {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.validate(winningNumbers, bonusNumber);
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  validate(winningNumbers, bonusNumber) {
    if (this.isDuplicateFor(winningNumbers, bonusNumber)) {
      throw new Error(
        '[ERROR] 당첨 번호와 보너스 번호에 중복이 존재할 수 없습니다.'
      );
    }
  }

  isDuplicateFor(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }

  determineAllLottosRank(lottos) {
    return lottos.reduce(
      (acc, lotto) => {
        acc[this.determineLottoRank(lotto) - 1] += 1;
        return acc;
      },
      [0, 0, 0, 0, 0, 0]
    );
  }

  determineLottoRank(lotto) {
    const matchCount = lotto.calculateMatchCount(this.#winningNumbers);

    return this.getLottoRank(lotto, matchCount);
  }

  getLottoRank(lotto, matchCount) {
    if (this.needsMatchBonus(matchCount)) {
      return LOTTO_RANK[matchCount](lotto.isBonus(this.#bonusNumber));
    }

    return LOTTO_RANK[matchCount] ?? RANK.NONE;
  }

  needsMatchBonus(matchCount) {
    return matchCount === 5;
  }

  calculateProfitRate(winningLottos, purchasePrice) {
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
