import { Rank } from "../constants/Constants.js";

class LottoCalculator {
  constructor(matchStates) {
    this.matchStates = matchStates;
  }

  calculateRank() {
    return this.matchStates.reduce((ranks, currentState) => {
      const CURRENT_RANK = Rank[currentState];
      ranks[CURRENT_RANK] = ranks[CURRENT_RANK] + 1 || 1;

      return ranks;
    }, {});
  }
}

export default LottoCalculator;
