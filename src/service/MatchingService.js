import { LOTTO_MATCH_CRITERIA } from '../constants/systemConstants.js';

export const calculateMatchingResult = (winningLotto, lottoArray) => {
  return lottoArray.reduce(
    (acc, lotto) => {
      const matchingCount = lotto.match(winningLotto).length;

      if (matchingCount < LOTTO_MATCH_CRITERIA.MIN_MATCH_COUNT) return acc;

      if (matchingCount === LOTTO_MATCH_CRITERIA.BONUS_MATCH_COUNT && winningLotto.isBonusMatched(lotto)) {
        return { ...acc, bonus: acc.bonus + 1 };
      }

      return { ...acc, [matchingCount]: acc[matchingCount] + 1 };
    },
    { 3: 0, 4: 0, 5: 0, 6: 0, bonus: 0 }
  );
};
