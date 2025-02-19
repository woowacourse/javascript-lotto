export const checkWinningNumbers = (winningNumbers, lotto) => {
  let matchedCount = 0;
  const myLottoNumber = lotto.numbers;

  winningNumbers.forEach((winningNumber) => {
    if (myLottoNumber.includes(winningNumber)) {
      matchedCount += 1;
    }
  });

  return matchedCount;
};

const checkResult = () => {};

export default checkResult;
