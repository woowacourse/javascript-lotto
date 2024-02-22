class RateOfReturnCalculator {
  static WINNING_PRIZE_DETAIL = {
    '1st': 2_000_000_000,
    '2nd': 30_000_000,
    '3rd': 1_500_000,
    '4th': 50_000,
    '5th': 5_000,
  };

  #buyLottoPrice;

  #winningRankResult;

  constructor({ buyLottoPrice, winningRankResult }) {
    this.#buyLottoPrice = buyLottoPrice;
    this.#winningRankResult = winningRankResult;
  }

  execute() {
    const totalPrize = this.#calculateTotalPrize();

    return this.#formatTotalPrizeToRateOfReturn(totalPrize);
  }

  #calculateTotalPrize() {
    const totalPrize = Object.keys(this.#winningRankResult).reduce((total, rank) => {
      const count = this.#winningRankResult[rank];
      const prize = RateOfReturnCalculator.WINNING_PRIZE_DETAIL[rank];

      return total + count * prize;
    }, 0);

    return totalPrize;
  }

  #formatTotalPrizeToRateOfReturn(totalPrize) {
    return ((totalPrize / this.#buyLottoPrice) * 100).toFixed(1);
  }
}

export default RateOfReturnCalculator;
