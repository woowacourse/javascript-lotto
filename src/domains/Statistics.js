import { BONUS_MATCHED_COUNT, PRIZE_KEYS, WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #profitRate;

  constructor(matchingResults, paymentAmount) {
    this.#calculateRanks(matchingResults);
    this.#calculateProfitRate(paymentAmount);
  }

  get statisticsResult() {
    return this.#ranks.reduce(
      (acc, rank) => {
        acc[rank] += 1;
        return acc;
      },
      { ...PRIZE_KEYS },
    );
  }

  get totalPrizes() {
    return this.#ranks.reduce(
      (totalPrizes, rank) => totalPrizes + WINNING_RULE.get(rank).money,
      0,
    );
  }

  get profitRate() {
    return this.#profitRate;
  }

  #calculateRanks(results) {
    results.forEach((result) => this.#checkTicket(result));
  }

  #checkTicket(result) {
    WINNING_RULE.forEach(({ matchedCount, isBonus }, prizeKey) => {
      const checkBonusMatch = matchedCount === BONUS_MATCHED_COUNT;
      const isMatchingCount = matchedCount === result.matchedCount;
      const isWinningLotto = !checkBonusMatch
        ? isMatchingCount
        : isBonus === result.isBonus && isMatchingCount;

      if (isWinningLotto) this.#ranks.push(prizeKey);
    });
  }

  #calculateProfitRate(paymentAmount) {
    this.#profitRate = Number(
      ((this.totalPrizes / paymentAmount) * 100).toFixed(1),
    );
  }
}

export default Statistics;
