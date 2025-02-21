import countMatchedNumbers from '../util/countMatchedNumbers.js';

function getWinCategory(matchedCount, isBonusMatched) {
  switch (matchedCount) {
    case 6:
      return 'SIX_MATCH';
    case 5:
      return isBonusMatched ? 'FIVE_MATCH_WITH_BONUS' : 'FIVE_MATCH';
    case 4:
      return 'FOUR_MATCH';
    case 3:
      return 'THREE_MATCH';
    default:
      return 'NO_MATCH';
  }
}

export function calculateWins(lottos, parsedLotto) {
  const { checkedLotto, checkedBonusNumber } = parsedLotto;

  const winCount = {
    SIX_MATCH: 0,
    FIVE_MATCH_WITH_BONUS: 0,
    FIVE_MATCH: 0,
    FOUR_MATCH: 0,
    THREE_MATCH: 0,
    NO_MATCH: 0,
  };

  lottos.forEach((lotto) => {
    const matchedCount = countMatchedNumbers(
      lotto.numbers,
      checkedLotto.numbers,
    );
    const isBonusMatched = lotto.numbers.includes(checkedBonusNumber);
    const category = getWinCategory(matchedCount, isBonusMatched);
    winCount[category] += 1;
  });

  return winCount;
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
