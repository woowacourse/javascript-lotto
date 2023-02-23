import { prize, values } from '../constants/values';

class LottoResultCalculator {
  #statistics = {
    ranks: new Array(6).fill(0),
    rateOfProfit: null,
  };

  calculateRateOfProfit(lotteryWinningsSum, lottosLength) {
    const { LOTTO_PRICE } = values;
    const spentMoney = lottosLength * LOTTO_PRICE;

    return (lotteryWinningsSum / spentMoney) * 100;
  }

  calculateTotalSum = ranks => ranks.reduce((acc, curr) => acc + prize[curr - 1], 0);

  calculateStatistics(totalRanks) {
    totalRanks.forEach(rank => {
      this.#statistics.ranks[rank - 1]++;
    });

    this.#statistics.rateOfProfit = this.calculateRateOfProfit(
      this.calculateTotalSum(totalRanks),
      totalRanks.length,
    );

    return this.#statistics;
  }
}

export default LottoResultCalculator;
