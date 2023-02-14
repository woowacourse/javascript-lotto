import { PRIZE } from '../data/Constants';

class LottoGame {
  constructor() {}

  calculateEarningRate() {}

  calculateTotalPrize(ranks) {
    return ranks.reduce(
      (acc, cur) => (PRIZE[cur] !== undefined ? (acc += PRIZE[cur]) : acc),
      0
    );
  }
}

export default LottoGame;
