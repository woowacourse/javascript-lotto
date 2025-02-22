import processDecimalPoint from "../../utils/processDecimalPoint.js";
import calculateProfitAmount from "./calculateProfitAmount.js";
import calculateProfitRate from "./calculateProfitRate.js";

const profitCalculator = (purchaseAmount, winningResult) => {
  const profitAmount = calculateProfitAmount(winningResult);
  const rate = calculateProfitRate(profitAmount, purchaseAmount);
  const profitRate = processDecimalPoint(rate);

  return profitRate;
};

export default profitCalculator;
