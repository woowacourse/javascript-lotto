import { GameControlStaticValue, Rank, Prize } from '../constants/Constants.js';

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
    }, this.#ranks);
  }

  calculateProfitRate() {
    return (
      (this.#calculateProfit() /
        (this.matchStates.length * GameControlStaticValue.PURCHASE_AMOUNT_UNIT)) *
      GameControlStaticValue.PERCENTAGE_DIVIDER
    ).toFixed(1);
  }

  #calculateProfit() {
    return Object.entries(this.#ranks).reduce((totalProfit, [rank, count]) => {
      return totalProfit + Prize[rank] * count;
    }, 0);
  }
}

export default LottoCalculator;
