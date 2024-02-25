import { RANK } from '../constants';

const LottoCalculator = {
  getRateOfReturn(purchaseAmount, matchingResult) {
    const totalPrizeMoney = this.calculateTotalPrizeMoney(matchingResult);

    const rate = (totalPrizeMoney / purchaseAmount) * 100;
    const rateOfReturn = (Math.round(rate * 10) / 10).toFixed(1);

    return rateOfReturn;
  },

  calculateTotalPrizeMoney(matchingResult) {
    const totalPrizeMoney = Object.keys(RANK).reduce(
      (acc, cur) => acc + RANK[cur].PRIZE * matchingResult[cur],
      0,
    );

    return totalPrizeMoney;
  },
};

export default LottoCalculator;
