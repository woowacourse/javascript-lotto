import { LOTTO_NUMBERS } from './constants.js';
import { lottoPrices } from './lottoPrices.js';

export function getRandomNumber() {
  return Math.floor(Math.random() * LOTTO_NUMBERS.LOTTO_MAX_NUM) + 1;
}

export function checkMatchingCount(lotto, winningNumbers) {
  return winningNumbers.reduce((matchingCount, winningNumber) => {
    if (lotto.numbers.has(winningNumber)) {
      matchingCount++;
    }
    return matchingCount;
  }, 0);
}

export function checkBonusNums(lotto, bonusNumber) {
  return lotto.numbers.has(bonusNumber);
}

export function setRanks(matchingCounts, isMatchBonusArr) {
  const ranks = [];
  for (let i = 0; i < matchingCounts.length; i++) {
    const price = findLottoRank(matchingCounts[i], isMatchBonusArr[i]);
    ranks.push(price ? price.rank : 0);
  }
  return ranks;
}

function findLottoRank(matchingCount, isMatchBonus) {
  return lottoPrices.find(
    lottoPrice =>
      lottoPrice.matchNumberCount === matchingCount &&
      lottoPrice.matchBonus === isMatchBonus
  );
}

export function countByRank(ranks) {
  const rankCounts = Array(5).fill(0);

  ranks.forEach(rank => {
    if (rank === 0) return;
    rankCounts[rank - 1]++;
  });

  return rankCounts;
}

export function calculateEarningRate(purchasedPrice, rankCounts) {
  return (sumTotalProfit(rankCounts) / purchasedPrice - 1) * 100;
}

function sumTotalProfit(rankCounts) {
  return rankCounts.reduce((sum, rankCount, idx) => {
    return sum + rankCount * lottoPrices[idx].price;
  }, 0);
}
