import { PRIZE_AMOUNT } from "../constants/lottoConstants";

const profitCalculator = {
  calculateProfit(lottoRankResult, budget) {
    return Number(
      (Object.keys(lottoRankResult).reduce((total, key) => {
        return total + lottoRankResult[key] * PRIZE_AMOUNT[key];
      }, 0) /
        budget) *
        100
    );
  },
};

export default profitCalculator;
