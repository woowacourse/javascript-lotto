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
        if (lotto.includes(bonusNumber)) {
          matchedCount = 5.5;
        }
      }
      if (matchedCount >= 3) {
        this.#statistics.set(
          matchedCount,
          this.#statistics.get(matchedCount) + 1,
        );
      }
    });
  }
}

export default WinningStatistics;
