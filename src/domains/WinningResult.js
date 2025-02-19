class WinningResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculate(lottos) {
    const counts = Array(5).fill(0);

    for (const lotto of lottos) {
      const sumSet = new Set([...lotto.numbers, ...this.#winningNumbers]);
      const duplicateCount = 12 - sumSet.size;

      if (duplicateCount === 5 && !lotto.numbers.includes(this.#bonusNumber)) {
        counts[2]++;
        continue;
      }

      this.#checkDuplicateCount(duplicateCount, counts);
    }

    return counts;
  }

  #checkDuplicateCount(duplicateCount, counts) {
    if (duplicateCount === 3) {
      counts[0]++;
      return;
    }

    if (duplicateCount === 4) {
      counts[1]++;
      return;
    }

    if (duplicateCount === 5) {
      counts[3]++;
      return;
    }

    if (duplicateCount === 6) {
      counts[4]++;
    }
  }

  calculateProfitRate(lottoPurchasePrice, counts) {
    const totalReward =
      counts[0] * 5000 +
      counts[1] * 50000 +
      counts[2] * 1500000 +
      counts[3] * 30000000 +
      counts[4] * 2000000000;
    return ((totalReward - lottoPurchasePrice) / lottoPurchasePrice) * 100;
  }
}

export default WinningResult;
