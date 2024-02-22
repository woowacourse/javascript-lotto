import { WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #reward = {
    totalPrizes: 0,
    profitRate: 0,
  };

  get profitRate() {
    return this.#reward.profitRate;
  }
  // eslint-disable-next-line
  #makeInitialStatisticsResult() {
    const initialStatisticsResult = {};

    WINNING_RULE.forEach((_, key) => {
      initialStatisticsResult[key] = 0;
    });

    return initialStatisticsResult;
  }

  get statisticsResult() {
    return this.#ranks.reduce((acc, rank) => {
      acc[rank] += 1;
      return acc;
    }, this.#makeInitialStatisticsResult());
  }

  checkTickets(results) {
    results.forEach((result) => this.#checkTicket(result));
  }

  #checkTicket(result) {
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

  calculateProfitRate(paymentAmount) {
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
