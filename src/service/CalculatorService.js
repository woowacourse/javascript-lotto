import countMatchedNumbers from '../util/countMatchedNumbers.js';
import systemSettings from '../settings/systemSettings.js';

export function calculateWins(lottos, parsedLotto) {
  const { checkedLotto, checkedBonusNumber } = parsedLotto;
  lottos.forEach((lotto) => {
    const matchedCount = countMatchedNumbers(
      lotto.numbers,
      checkedLotto.numbers,
    );
    const isBonusMatched = lotto.numbers.includes(checkedBonusNumber);

    if (matchedCount === 6) systemSettings.winCount.SIX_MATCH += 1;
    else if (matchedCount === 5 && isBonusMatched)
      systemSettings.winCount.FIVE_MATCH_WITH_BONUS += 1;
    else if (matchedCount === 5 && !isBonusMatched)
      systemSettings.winCount.FIVE_MATCH += 1;
    else if (matchedCount === 4) systemSettings.winCount.FOUR_MATCH += 1;
    else if (matchedCount === 3) systemSettings.winCount.THREE_MATCH += 1;
    else systemSettings.winCount.NO_MATCH += 1;
  });
  return systemSettings.winCount;
}

export function calculatePrize(winCount, prizeMoney) {
  let total = 0;
  for (const [prizeName, prizeCount] of Object.entries(winCount)) {
    total += prizeMoney[prizeName] * prizeCount;
  }
  return total;
}
