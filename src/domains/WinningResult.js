import { PROFIT } from "../constants/CONFIGURATIONS";

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
      const matchCount =
        lotto.numbers.length + this.#winningNumbers.length - sumSet.size;

      if (matchCount === 5 && !lotto.numbers.includes(this.#bonusNumber)) {
        counts[2]++;
        continue;
      }

      this.#checkMatchCount(matchCount, counts);
    }

    return counts;
  }

  #checkMatchCount(matchCount, counts) {
    if (matchCount === 3) {
      counts[0]++;
      return;
    }

    if (matchCount === 4) {
      counts[1]++;
      return;
    }

    if (matchCount === 5) {
      counts[3]++;
      return;
    }

    if (matchCount === 6) {
      counts[4]++;
    }
  }

  calculateProfitRate(lottoPurchasePrice, counts) {
    const totalReward =
      counts[0] * PROFIT.FIFTH +
      counts[1] * PROFIT.FOURTH +
      counts[2] * PROFIT.THIRD +
      counts[3] * PROFIT.SECOND +
      counts[4] * PROFIT.FIRST;
    return ((totalReward - lottoPurchasePrice) / lottoPurchasePrice) * 100;
  }
}

export default WinningResult;
