import Rank from "../../domain/Rank.js";

export const statistics = (lotto, winningNumber) => {
  const { matchWinning, matchBonus } = winningNumber.getMatchCount(lotto);
  const rank = Rank.findRank(matchWinning, matchBonus);
  return rank;
};

export const calculateProfit = (purchaseAmount, totalWinningAmount) => {
  const profitRate = (totalWinningAmount / purchaseAmount) * 100;
  return Number(profitRate.toFixed(1));
};
