import { WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #reward = {
    totalPrizes: 0,
    profitRate: 0,
  };

  constructor(matchingResults, paymentAmount) {
    this.#matchResultsToRank(matchingResults);
    this.#calculateProfitRate(paymentAmount);
  }

  get lottoAnalytics() {
    return {
      profitRate: this.#reward.profitRate,
      statisticsResult: this.#getStatisticsResult(),
    };
  }

  // eslint-disable-next-line
  #makeInitialStatisticsResult() {
    const initialStatisticsResult = {};

    WINNING_RULE.forEach((_, key) => {
      initialStatisticsResult[key] = 0;
    });

    return initialStatisticsResult;
  }

  /**
   *
   * @returns {1:number, 2:number ,3:number, 4:number, 5:number}
   */
  #getStatisticsResult() {
    return this.#ranks.reduce((acc, rank) => {
      acc[rank] += 1;
      return acc;
    }, this.#makeInitialStatisticsResult());
  }

  /**
   *
   * @param {{isBonus:boolean, matchedCount:number}[]} result
   */
  #matchResultsToRank(results) {
    results.forEach((result) => this.#matchResultToRank(result));
  }

  /**
   *
   * @param {{isBonus:boolean, matchedCount:number}} result
   */
  #matchResultToRank(result) {
    WINNING_RULE.forEach((value, key) => {
      const { matchedCount, isBonus } = value;

      const checkBonusMatch = matchedCount === 5;
      const isMatchingCount = matchedCount === result.matchedCount;
      const isMatchingOnlyCount = !checkBonusMatch && isMatchingCount;
      const isMatchingBonusAndCount =
        checkBonusMatch && isBonus === result.isBonus;

      if (!isMatchingCount) return;
      if (isMatchingOnlyCount || isMatchingBonusAndCount) {
        this.#ranks.push(key);
      }
    });
  }

  #calculateProfitRate(paymentAmount) {
    this.#calculateTotalPrize();
    this.#reward.profitRate = Number(
      ((this.#reward.totalPrizes / paymentAmount) * 100).toFixed(1),
    );
  }

  #calculateTotalPrize() {
    this.#reward.totalPrizes = this.#ranks.reduce(
      (totalPrizes, rank) => totalPrizes + WINNING_RULE.get(rank).money,
      0,
    );
  }
}

export default Statistics;
