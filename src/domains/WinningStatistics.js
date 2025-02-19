import countMatchingNumbers from "../utils/countMatchingNumbers.js";

class WinningStatistics {
  #statistics = new Map([
    [3, 0],
    [4, 0],
    [5, 0],
    [5.5, 0],
    [6, 0],
  ]);

  get statistics() {
    return this.#statistics;
  }

  calculateWinningResults(lottos, winningNumbers, bonusNumber) {
    lottos.forEach((lotto) => {
      let matchedCount = countMatchingNumbers(winningNumbers, lotto);
      if (matchedCount === 5) {
        matchedCount = this.#calculateBonusNumber(lotto, bonusNumber);
      }
      this.#addMatchedCount(matchedCount);
    });
  }

  #calculateBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) return 5.5;
    return 5;
  }

  #addMatchedCount(matchedCount) {
    if (matchedCount >= 3) {
      this.#statistics.set(
        matchedCount,
        this.#statistics.get(matchedCount) + 1,
      );
    }
  }
}

export default WinningStatistics;
