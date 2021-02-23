export const getProfitRate = (totalCost, totalProfit) => {
  return ((totalProfit - totalCost) / totalCost) * 100;
};
