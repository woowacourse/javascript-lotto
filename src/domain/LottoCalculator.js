import NUMBER from '../constants/number';
import WINNER from '../constants/winner';

class LottoCalculator {
  getRateOfRevenue() {
    const revenue = this.caculateAllRevenue(result, lottoCount);
    const rateOfRevenue = this.calculateRateOfRevenue(revenue);
    return rateOfRevenue;
  }
  caculateAllRevenue(result = 0, lottoCount = 0) {
    return result.reduce((totalRevenue, prizeWinCount, index) => {
      const prizeMoney = WINNER[index + 1].PRICE;
      return (totalRevenue += prizeWinCount * prizeMoney);
    }, 0);
  }

  calculateRateOfRevenue(revenue, lottoCount) {
    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  }
}

export default LottoCalculator;
