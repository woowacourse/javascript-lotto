import { AMOUNT } from "../constants/lottoConstants";

const ProfitCalculator = {
  calculateProfit(lottoRankResult, budget) {
    return Number(
      (Object.keys(lottoRankResult).reduce((total, key) => {
        return total + lottoRankResult[key] * AMOUNT[key];
      }, 0) /
        budget) *
        100
    );
  },
};

export default ProfitCalculator;
