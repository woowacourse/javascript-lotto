import LOTTO_RULE from '../constants/rules/lottoRule';

export default function calculateROI(money, totalLottoRanks) {
  const moneyAmount = money.amount;
  const totalProfit = totalLottoRanks.reduce((profit, rankCount, idx) => {
    return (profit += rankCount[1] * LOTTO_RULE.PRIZE[idx]);
  }, 0);

  const profitRate = 100 + ((totalProfit - moneyAmount) / moneyAmount) * 100;

  return parseFloat(profitRate.toFixed(1));
}
