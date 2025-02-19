import { LOTTO } from '../constants/messages.js';

export const getWinningMatchCount = (lottos, lottoNumbers) => {
  let matchedCounts = [];

  lottos.forEach((lotto) => {
    let match = 0;
    lottoNumbers.winningNumbers.forEach((winningNumber) => {
      if (lotto.includes(winningNumber)) {
        match++;
      }
    });

    if (match === LOTTO.FIVE_MATCH && lotto.includes(lottoNumbers.bonusNumber)) {
      match = LOTTO.FIVE_WITH_BONUS_MATCH;
    }

    matchedCounts.push(match);
  });

  return matchedCounts;
};
