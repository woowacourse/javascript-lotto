export const checkWinningNumbers = (winningNumbers, lotto) => {
  const myLottoNumber = lotto.numbers;

  winningNumbers.forEach((winningNumber) => {
    if (myLottoNumber.includes(winningNumber)) {
      lotto.incrementWinningNumbers();
    }
  });

  return lotto.matchResult.matchedCount;
};

const checkResult = () => {};

export default checkResult;
