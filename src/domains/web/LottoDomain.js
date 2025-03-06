import issueLottos from "../common/issueLottos.js";
import WinningStatistics from "../common/WinningStatistics.js";

class LottoDomain {
  #purchaseAmount;
  #lottos;

  constructor() {
    this.#purchaseAmount = 0;
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  setPurchaseAmount(amount) {
    this.#purchaseAmount = amount;
  }

  issueLottos() {
    this.#lottos = issueLottos(this.#purchaseAmount);
  }

  calculateWinningStatistics(winningNumbers, bonusNumber) {
    const winningStatistics = new WinningStatistics(this.#lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);
    return {
      statistics: winningStatistics.statistics,
      profitRatio: winningStatistics.calculateProfitRatio(this.#purchaseAmount),
    };
  }
}

export default LottoDomain;
