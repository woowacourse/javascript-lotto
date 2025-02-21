import { lottoResults } from '../settings/systemSettings.js';
import countMatchedNumbers from '../util/countMatchedNumbers.js';

export function calculateWins(lottos, parsedLotto) {
  const { checkedLotto, checkedBonusNumber } = parsedLotto;
  lottos.forEach((lotto) => {
    const matchedCount = countMatchedNumbers(
      lotto.numbers,
      checkedLotto.numbers,
    );
    const isBonusMatched = lotto.numbers.includes(checkedBonusNumber);

    if (matchedCount === 6) lottoResults.winCount.SIX_MATCH += 1;
    else if (matchedCount === 5 && isBonusMatched)
      lottoResults.winCount.FIVE_MATCH_WITH_BONUS += 1;
    else if (matchedCount === 5 && !isBonusMatched)
      lottoResults.winCount.FIVE_MATCH += 1;
    else if (matchedCount === 4) lottoResults.winCount.FOUR_MATCH += 1;
    else if (matchedCount === 3) lottoResults.winCount.THREE_MATCH += 1;
    else lottoResults.winCount.NO_MATCH += 1;
  });
  return lottoResults.winCount;
}
export function calculatePrize(winCount, prizeMoney) {
  return Object.entries(winCount).reduce(
    (totalPrize, [prizeName, prizeCount]) => {
      return totalPrize + prizeMoney[prizeName] * prizeCount;
    },
    0,
  );
}

export function calculateRevenueRate(total, purchasePrice) {
  return (total / Number(purchasePrice)) * 100;
}
