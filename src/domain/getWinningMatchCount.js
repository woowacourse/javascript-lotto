import { LOTTO } from '../constants/messages.js';

export const getWinningMatchCount = (lottos, lottoNumbers) => {
  return lottos.reduce(
    (matchCounts, lotto) => {
      let match = plusIfWinningNumbers(lottoNumbers, lotto);
      if (match === LOTTO.FIVE_MATCH && lotto.includes(lottoNumbers.bonusNumber)) {
        match = LOTTO.FIVE_WITH_BONUS_MATCH_IDX;
      }

      matchCounts[match]++;
      return matchCounts;
    },
    [0, 0, 0, 0, 0, 0, 0, 0],
  );
};

const plusIfWinningNumbers = (lottoNumbers, lotto) => {
  return lottoNumbers.winningNumbers.reduce((match, winningNumber) => {
    return match + (lotto.includes(winningNumber) ? 1 : 0);
  }, 0);
};
