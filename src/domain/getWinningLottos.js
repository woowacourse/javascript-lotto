export const getWinningMatchCount = (lottos, lottoNumbers) => {
  let matchedCounts = [];

  lottos.forEach((lotto) => {
    let match = 0;
    lottoNumbers.winningNumbers.forEach((winningNumber) => {
      if (lotto.includes(winningNumber)) {
        match++;
      }
    });

    if (match === 5 && lotto.includes(lottoNumbers.bonusNumber)) {
      match += 0.5;
    }

    matchedCounts.push(match);
  });

  return matchedCounts;
};
