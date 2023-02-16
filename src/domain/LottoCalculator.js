import { Prize, Rank, StaticValue } from "../constants/Constants.js";

class LottoCalculator {
  constructor(matchStates) {
    this.matchStates = matchStates;
    this.ranks = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
  }

  calculateRank() {
    return this.matchStates.reduce((ranks, currentState) => {
      const CURRENT_RANK = Rank[currentState];
      ranks[CURRENT_RANK] += 1;

      return ranks;
    }, this.ranks);
  }

  calculateProfitRate() {
    return (
      (this.#calculateProfit() /
        (this.matchStates.length * StaticValue.PURCHASE_AMOUNT_UNIT)) *
      100
    ).toFixed(1);
  }

  #calculateProfit() {
    return Object.entries(this.ranks).reduce((totalProfit, [rank, count]) => {
      return totalProfit + Prize[rank] * count;
    }, 0);
  }
}

export default LottoCalculator;
