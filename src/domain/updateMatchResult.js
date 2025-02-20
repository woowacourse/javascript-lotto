export const updateMatchCount = (lotto, winningNumbers) => {
  const myLottoNumber = lotto.numbers;

  winningNumbers.forEach((winningNumber) => {
    if (myLottoNumber.includes(winningNumber)) {
      lotto.incrementWinningNumbers();
    }
  });

  return lotto.matchResult.matchCount;
};

export const updateBonusMatched = (lotto, bonusNumber) => {
  const myLottoNumber = lotto.numbers;
  if (myLottoNumber.includes(bonusNumber)) {
    lotto.markBonusMatched();
    return true;
  }
  return false;
};

const updateMatchResult = (lotto, winningNumbers, bonusNumber) => {
  updateMatchCount(lotto, winningNumbers);
  updateBonusMatched(lotto, bonusNumber);
};

export default updateMatchResult;
