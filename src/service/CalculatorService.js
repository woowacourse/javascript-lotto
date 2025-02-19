import countMatchedNumbers from './MatchService.js';

const prizeMoney = {
  THREE_MATCH: 5_000,
  FOUR_MATCH: 50_000,
  FIVE_MATCH: 1_500_000,
  FIVE_MATCH_WITH_BONUS: 30_000_000,
  SIX_MATCH: 2_000_000_000,
};
const winCount = {
  NO_MATCH: 0,
  THREE_MATCH: 0,
  FOUR_MATCH: 0,
  FIVE_MATCH: 0,
  FIVE_MATCH_WITH_BONUS: 0,
  SIX_MATCH: 0,
};

function calculateWins(lottos, parsedLotto) {
  // lottos : Lotto 객체의 배열
  const { checkedLotto, checkedBonusNumber } = parsedLotto;
  lottos.forEach((lotto) => {
    const matchedCount = countMatchedNumbers(
      lotto.numbers,
      checkedLotto.numbers,
    );
    const isBonusMatched = lotto.numbers.includes(checkedBonusNumber);
    if (matchedCount === 6) winCount.SIX_MATCH += 1;
    else if (matchedCount === 5 && isBonusMatched)
      winCount.FIVE_MATCH_WITH_BONUS += 1;
    else if (matchedCount === 5 && !isBonusMatched) winCount.FIVE_MATCH += 1;
    else if (matchedCount === 4) winCount.FOUR_MATCH += 1;
    else if (matchedCount === 3) winCount.THREE_MATCH += 1;
    else winCount.NO_MATCH += 1;
  });
  return winCount;
}

export default calculateWins;
