import { PRIZE } from '../data/Constants';

class LottoGame {
  constructor() {}

  calculateEarningRate(price, totalAmount) {
    return (totalAmount / price).toFixed(2);
  }

  calculateTotalPrize(ranks) {
    return ranks.reduce(
      (acc, cur) => (PRIZE[cur] !== undefined ? (acc += PRIZE[cur]) : acc),
      0
    );
  }
}

export default LottoGame;
