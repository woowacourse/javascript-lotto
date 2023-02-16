class LottoStatistics {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
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
