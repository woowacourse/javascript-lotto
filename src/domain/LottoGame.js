import { PRIZE } from '../data/Constants';
import Win from './Win';

class LottoGame {
  #win;

  constructor() {}

  initializeWin(winningNumber) {
    this.#win = new Win(winningNumber);
    console.log(this.#win.winningNumber, 'initializeWin');
  }

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
