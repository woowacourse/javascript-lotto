import { LOTTO } from '../constants/messages.js';

export const getWinningMatchCount = (randomlottos, lottoNumbers) => {
  const test = randomlottos.reduce(
    (matchCounts, cur) => {
      let match = plusIfWinningNumbers(lottoNumbers, cur);
      if (match === LOTTO.FIVE_MATCH && cur.includes(lottoNumbers.bonusNumber)) {
        match = LOTTO.FIVE_WITH_BONUS_MATCH_IDX;
      }

      matchCounts[match]++;
      return matchCounts;
    },
    [0, 0, 0, 0, 0, 0, 0, 0],
  );

  return test;
};

const plusIfWinningNumbers = (lottoNumbers, randomLotto) => {
  return lottoNumbers.winningNumbers.reduce((match, winningNumber) => {
    return match + (randomLotto.includes(winningNumber) ? 1 : 0);
  }, 0);
};
