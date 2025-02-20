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
    lottos.forEach((lotto) => {
      const matchCount = this.#getMatchCount(lotto);
      if (matchCount === 6) counts[4] += 1;
      if (matchCount === 5 && lotto.numbers.includes(this.#bonusNumber))
        counts[3] += 1;
      if (matchCount === 5 && !lotto.numbers.includes(this.#bonusNumber))
        counts[2] += 1;
      if (matchCount === 4) counts[1] += 1;
      if (matchCount === 3) counts[0] += 1;
    });

    return counts;
  }

  calculateProfitRate(lottoPurchasePrice, counts) {
    // eslint-disable-next-line max-params
    const totalReward = counts.reduce((acc, curr, i) => {
      return acc + curr * PROFIT[i];
    }, 0);
    return ((totalReward - lottoPurchasePrice) / lottoPurchasePrice) * 100;
  }

  #getMatchCount(lotto) {
    const sumSet = new Set([...lotto.numbers, ...this.#winningNumbers]);
    const matchCount =
      lotto.numbers.length + this.#winningNumbers.length - sumSet.size;

    return matchCount;
  }
}

export default WinningResult;
