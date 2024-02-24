import NUMBER from '../constants/number';
import WINNER from '../constants/winner';

class LottoCalculator {
  getRateOfRevenue(result, lottosCount) {
    const revenue = this.#caculateAllRevenue(result);
    const rateOfRevenue = this.#calculateRateOfRevenue(revenue, lottosCount);
    return rateOfRevenue;
  }
  #caculateAllRevenue(result = 0) {
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
