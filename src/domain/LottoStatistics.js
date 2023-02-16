class LottoStatistics {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
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
    if (lotto.calculateMatchCount(this.#winningNumbers.winningNumbers) === 6) {
      return 1;
    }

    if (
      lotto.calculateMatchCount(this.#winningNumbers.winningNumbers) === 5 &&
      lotto.isBonus(this.#bonusNumber.bonusNumber)
    ) {
      return 2;
    }

    if (
      lotto.calculateMatchCount(this.#winningNumbers.winningNumbers) === 5 &&
      !lotto.isBonus(this.#bonusNumber.bonusNumber)
    ) {
      return 3;
    }

    if (lotto.calculateMatchCount(this.#winningNumbers.winningNumbers) === 4) {
      return 4;
    }

    if (lotto.calculateMatchCount(this.#winningNumbers.winningNumbers) === 3) {
      return 5;
    }

    return 6;
  }
}

module.exports = LottoStatistics;
