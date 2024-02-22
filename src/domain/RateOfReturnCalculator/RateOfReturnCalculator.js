/**
 * @module RateOfReturnCalculator
 * 수익률 계산의 역할을 수행하는 도메인 객체
 */
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

  /**
   * @param {{buyLottoPrice : number, winningRankResult : import("../../types/jsDoc").WinningRankResult}} param - 로또 구입 금액과, 각 등수의 당첨 횟수  담긴 객체
   */
  constructor({ buyLottoPrice, winningRankResult }) {
    this.#buyLottoPrice = buyLottoPrice;
    this.#winningRankResult = winningRankResult;
  }

  /**
   * @returns {string} - 수익률
   */
  execute() {
    const totalPrize = this.#calculateTotalPrize();

    return this.#formatTotalPrizeToRateOfReturn(totalPrize);
  }

  /**
   * @returns {number} - 총 당첨 금액
   */
  #calculateTotalPrize() {
    const totalPrize = Object.keys(this.#winningRankResult).reduce((total, rank) => {
      const count = this.#winningRankResult[rank];
      const prize = RateOfReturnCalculator.WINNING_PRIZE_DETAIL[rank];

      return total + count * prize;
    }, 0);

    return totalPrize;
  }

  /**
   * @param {number} totalPrize - 총 당첨 금액
   * @returns {string} 소숫점 둘째 자리에서 반올림 된 수익률
   */
  #formatTotalPrizeToRateOfReturn(totalPrize) {
    return ((totalPrize / this.#buyLottoPrice) * 100).toFixed(1);
  }
}

export default RateOfReturnCalculator;
