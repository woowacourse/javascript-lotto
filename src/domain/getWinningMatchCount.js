import { LOTTO } from '../constants/messages.js';

export const getWinningMatchCount = (randomlottos, lottoNumbers) => {
  let matchedCounts = [];

  randomlottos.forEach((randomLotto) => {
    let match = 0;
    lottoNumbers.winningNumbers.forEach((winningNumber) => {
      if (randomLotto.includes(winningNumber)) {
        match++;
      }
    });

    if (match === LOTTO.FIVE_MATCH && randomLotto.includes(lottoNumbers.bonusNumber)) {
      match = LOTTO.FIVE_WITH_BONUS_MATCH;
    }

    matchedCounts.push(match);
  });

  return matchedCounts;
};
