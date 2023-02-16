class LottoStatistics {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.validate(winningNumbers.winningNumbers, bonusNumber.bonusNumber);
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  validate(winningNumbers, bonusNumber) {
    if (this.#isDuplicateFor(winningNumbers, bonusNumber)) {
      throw new Error(
        '[ERROR] 당첨 번호와 보너스 번호에 중복이 존재할 수 없습니다.'
      );
    }
  }

  #isDuplicateFor(winningNumbers, bonusNumber) {
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

  calculateProfitRate(winningLottos, purchasePrice) {
    const list = [2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0];
    return (
      (winningLottos.reduce((acc, cur, idx) => acc + list[idx] * cur, 0) /
        purchasePrice) *
      100
    ).toFixed(1);
  }
}

module.exports = LottoStatistics;
