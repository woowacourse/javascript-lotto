import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';

export const getWinningMatchCount = (lottos, winningLotto) => {
  return lottos.reduce(
    (matchCounts, lotto) => {
      const tmpMatch = lotto.getMatchingCount(winningLotto.getWinningNumbers());
      const match =
        tmpMatch === LOTTO_SYSTEM.FIVE_MATCH && lotto.includes(winningLotto.getBonusNumber())
          ? LOTTO_SYSTEM.FIVE_WITH_BONUS_MATCH_IDX
          : tmpMatch;

      matchCounts[match]++;
      return matchCounts;
    },
    [0, 0, 0, 0, 0, 0, 0, 0],
  );
};
