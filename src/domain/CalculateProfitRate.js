import { RANKING } from '../constant/setting.js';

const calculateProfitRate = (purchaseAmount, winningResults) => {
  const totalProfit = Object.entries(winningResults).reduce((profit, [ranking, count]) => {
    return (profit += RANKING[ranking].REWARD * count);
  }, 0);
  return ((totalProfit * 100) / purchaseAmount).toLocaleString('ko-KR', { minimumFractionDigits: 1 });
};

export default calculateProfitRate;
