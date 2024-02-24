import CONDITION from '../../constant/Condition';

class WinningRewardService {
  #winningResult;

  #purchasedCount;

  constructor(winningResult, purchasedCount) {
    this.#winningResult = winningResult;
    this.#purchasedCount = purchasedCount;
  }

  getWinningPrice() {
    return Object.entries(this.#winningResult).reduce(
      (total, [matched, count]) => total + CONDITION.winningPrice[matched] * count,
      0,
    );
  }

  getReturnRate() {
    const PERCENT_UNIT = 100;
    return (
      (this.getWinningPrice() / (this.#purchasedCount * CONDITION.pricePerLotto)) * PERCENT_UNIT
    );
  }
}

export default WinningRewardService;
