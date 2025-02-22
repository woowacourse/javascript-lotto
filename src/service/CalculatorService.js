import countMatchedNumbers from '../util/countMatchedNumbers.js';

const winCount = {
  NO_MATCH: 0,
  THREE_MATCH: 0,
  FOUR_MATCH: 0,
  FIVE_MATCH: 0,
  FIVE_MATCH_WITH_BONUS: 0,
  SIX_MATCH: 0,
};

export function calculateWins(lottos, parsedLotto) {
  const { checkedLotto, checkedBonusNumber } = parsedLotto;
  lottos.forEach((lotto) => {
    const matchedCount = countMatchedNumbers(
      lotto.numbers,
      checkedLotto.numbers,
    );
    const isBonusMatched = lotto.numbers.includes(checkedBonusNumber);

    switch (matchedCount) {
      case 6:
        winCount.SIX_MATCH += 1;
        break;
      case 5:
        winCount[isBonusMatched ? 'FIVE_MATCH_WITH_BONUS' : 'FIVE_MATCH'] += 1;
        break;
      case 4:
        winCount.FOUR_MATCH += 1;
        break;
      case 3:
        winCount.THREE_MATCH += 1;
        break;
      default:
        winCount.NO_MATCH += 1;
    }
  });
  return winCount;
}

export function calculatePrize(winCount, prizeMoney) {
  const total = Object.entries(winCount).reduce(
    (acc, [prizeName, prizeCount]) => {
      return acc + prizeMoney[prizeName] * prizeCount;
    },
    0,
  );

  return total;
}

export function calculateRevenueRate(total, purchasePrice) {
  return (total / Number(purchasePrice)) * 100;
}
