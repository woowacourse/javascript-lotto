class WinningResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculate(lottos) {
    const counts = Array.from({ length: 5 }, () => 0);

    for (const lotto of lottos) {
      const sumSet = new Set([...lotto, ...this.#winningNumbers]);
      const duplicateCount = 12 - sumSet.size;

      if (duplicateCount === 5 && !lotto.includes(this.#bonusNumber)) {
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
}

export default WinningResult;
