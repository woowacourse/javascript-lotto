import { StaticValue, Rank, Prize } from '../constants/Constants.js';

class LottoCalculator {
  #ranks = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  constructor(matchStates) {
    this.matchStates = matchStates;
  }

  calculateRank() {
    return this.matchStates.reduce((ranks, currentState) => {
      const CURRENT_RANK = Rank[currentState];
      ranks[CURRENT_RANK] += 1;

      return ranks;
    }, { ...this.#ranks });
  }

  calculateProfitRate(ranks) {
    return (
      (this.#calculateProfit(ranks) / (this.matchStates.length * StaticValue.PURCHASE_AMOUNT_UNIT))
      * 100
    ).toFixed(1);
  }

  #calculateProfit(ranks) {
    return Object.entries(ranks).reduce(
      (totalProfit, [rank, count]) => totalProfit + Prize[rank] * count,
      0
    );
  }
}

export default LottoCalculator;
