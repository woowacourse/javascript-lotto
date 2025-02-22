import { HUNDRED_PERCENT } from "../../constants/constant.js";

const calculateProfitRate = (profitAmount, purchaseAmount) => {
  return (profitAmount / purchaseAmount) * HUNDRED_PERCENT;
};

export default calculateProfitRate;
