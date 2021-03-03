export const getProfitRate = (totalCost, totalProfit) => {
  if (Number.isNaN(totalCost) || Number.isNaN(totalProfit)) return;
  
  return ((totalProfit - totalCost) / totalCost) * 100;
};
