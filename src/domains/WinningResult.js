import { PROFIT } from '../constants/CONFIGURATIONS.js';

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
        counts[2] += 1;
        continue;
      }

      this.#checkMatchCount(matchCount, counts);
    }

    return counts;
  }

  #checkMatchCount(matchCount, counts) {
    if (matchCount === 3) {
      counts[0] += 1;
      return;
    }

    if (matchCount === 4) {
      counts[1] += 1;
      return;
    }

    if (matchCount === 5) {
      counts[3] += 1;
      return;
    }

    if (matchCount === 6) {
      counts[4] += 1;
    }
  }

  calculateProfitRate(lottoPurchasePrice, counts) {
    // eslint-disable-next-line max-params
    const totalReward = counts.reduce((acc, curr, i) => {
      return acc + curr * PROFIT[i];
    }, 0);
    return ((totalReward - lottoPurchasePrice) / lottoPurchasePrice) * 100;
  }
}

export default WinningResult;
