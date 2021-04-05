import { lottoPrices } from '../model/lottoPrices.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export function setRanks(lottos, winningNumbers) {
  const matchingCounts = getMatchingNums(lottos, winningNumbers);
  const isMatchBonusArr = getMatchingBonus(
    lottos,
    winningNumbers[LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1]
  );

  return initRanks(matchingCounts, isMatchBonusArr);
}

export function getMatchingNums(lottos, winningNumbers) {
  return lottos.map(lotto =>
    checkMatchingCount(
      lotto,
      winningNumbers.slice(0, LOTTO_NUMBERS.LOTTO_COUNT)
    )
  );
}

export function checkMatchingCount(lotto, winningNumbers) {
  return winningNumbers.reduce((matchingCount, winningNumber) => {
    if (lotto.numbers.has(winningNumber)) {
      matchingCount++;
    }
    return matchingCount;
  }, 0);
}

export function getMatchingBonus(lottos, bonusNumber) {
  return lottos.map(lotto => lotto.numbers.has(bonusNumber));
}

export function initRanks(matchingCounts, isMatchBonusArr) {
  const ranks = [];

  for (let i = 0; i < matchingCounts.length; i++) {
    const lottoPrice = findLottoRank(matchingCounts[i], isMatchBonusArr[i]);
    ranks.push(lottoPrice ? lottoPrice.rank : 0);
  }

  return ranks;
}

export function findLottoRank(matchingCount, isMatchBonus) {
  return lottoPrices.find(
    lottoPrice =>
      lottoPrice.matchNumberCount === matchingCount &&
      lottoPrice.matchBonus === isMatchBonus
  );
}
