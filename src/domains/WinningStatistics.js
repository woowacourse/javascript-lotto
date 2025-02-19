import countMatchingNumbers from "../utils/countMatchingNumbers.js";

class WinningStatistics {
  #statistics = new Map([
    [3, { count: 0, amount: 5000 }],
    [4, { count: 0, amount: 50_000 }],
    [5, { count: 0, amount: 1_500_000 }],
    [5.5, { count: 0, amount: 30_000_000 }],
    [6, { count: 0, amount: 2_000_000_000 }],
  ]);

  get statistics() {
    return this.#statistics;
  }

  calculateProfitRatio(purchaseAmount) {
    const profitAmount = Array.from(this.#statistics.values()).reduce(
      (sum, { count, amount }) => sum + count * amount,
      0,
    );

    return ((profitAmount / purchaseAmount) * 100).toFixed(1);
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
      this.#statistics.set(matchedCount, {
        ...this.#statistics.get(matchedCount),
        count: this.#statistics.get(matchedCount).count + 1,
      });
    }
  }
}

export default WinningStatistics;
