import { LOTTO } from '../constants/messages.js';

export const getWinningMatchCount = (randomlottos, lottoNumbers) => {
  let matchCounts = [0, 0, 0, 0, 0, 0, 0, 0];

  randomlottos.forEach((randomLotto) => {
    let match = 0;
    lottoNumbers.winningNumbers.forEach((winningNumber) => {
      if (randomLotto.includes(winningNumber)) {
        match++;
      }
    });

    if (match === LOTTO.FIVE_MATCH && randomLotto.includes(lottoNumbers.bonusNumber)) {
      match = LOTTO.FIVE_WITH_BONUS_MATCH_IDX;
    }

    matchCounts[match]++;
  });

  return matchCounts;
};
