import countMatchedNumbers from './MatchService.js';
import systemSettings from '../settings/systemSettings.js';
const prizeMoney = {
  THREE_MATCH: 5_000,
  FOUR_MATCH: 50_000,
  FIVE_MATCH: 1_500_000,
  FIVE_MATCH_WITH_BONUS: 30_000_000,
  SIX_MATCH: 2_000_000_000,
};

function calculateWins(lottos, parsedLotto) {
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

export default calculateWins;
