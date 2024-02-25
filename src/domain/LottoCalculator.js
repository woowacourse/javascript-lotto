import NUMBER from '../constants/number';
import WINNER from '../constants/winner';

/**
 * @module LottoCalculator 로또의 결과와 구매 금액을 분석해 수익을 합산해 최종 수익률을 반환하는 모듈입니다.
 */

class LottoCalculator {
  /**
   *
   * @param {array} result 1~5등까지의 당첨 숫자를 담은 결과 배열을 전달합니다.
   * @param {number} lottosCount 로또를 구매한 개수입니다.
   * @returns 로또의 최종 수익률을 계산해 반환합니다.
   */
  getRateOfRevenue(result, lottosCount) {
    const revenue = this.#caculateAllRevenue(result);
    const rateOfRevenue = this.#calculateRateOfRevenue(revenue, lottosCount);
    return rateOfRevenue;
  }
  #caculateAllRevenue(result) {
    return result.reduce((totalRevenue, prizeWinCount, index) => {
      const prizeMoney = WINNER[index + 1].PRICE;
      return (totalRevenue += prizeWinCount * prizeMoney);
    }, 0);
  }
  #calculateRateOfRevenue(revenue, lottosCount) {
    return ((revenue / (lottosCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  }
}

export default LottoCalculator;
