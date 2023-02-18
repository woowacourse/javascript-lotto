import { StaticValue, Rank, InitialRank, Prize } from '../constants/Constants.js';

class LottoCalculator {
  constructor(matchStates) {
    this.matchStates = matchStates;
  }

  calculateRank() {
    return this.matchStates.reduce((ranks, currentState) => {
      const CURRENT_RANK = Rank[currentState];
      ranks[CURRENT_RANK] += 1;

      return ranks;
    }, { ...InitialRank });
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
