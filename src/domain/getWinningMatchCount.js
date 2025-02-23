import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';

export const getWinningMatchCount = (lottos, winningLotto) => {
  return lottos.reduce(
    (matchCounts, lotto) => {
      let match = lotto.getMatchingCount(winningLotto);
      if (match === LOTTO_SYSTEM.FIVE_MATCH && lotto.includes(winningLotto.getBonusNumber())) {
        match = LOTTO_SYSTEM.FIVE_WITH_BONUS_MATCH_IDX;
      }

      matchCounts[match]++;
      return matchCounts;
    },
    [0, 0, 0, 0, 0, 0, 0, 0],
  );
};
