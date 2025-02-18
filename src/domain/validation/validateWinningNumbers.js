const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(",").map((x) => Number(x.trim()));

  if (winningNumbers.length !== 6) {
    throw new Error();
  }
  winningNumbers.forEach((winningNumber) => {
    if (Number.isNaN(winningNumber)) {
      throw new Error();
    }
    if (!Number.isInteger(winningNumber)) {
      throw new Error();
    }
    if (1 > winningNumber || 45 < winningNumber) {
      throw new Error();
    }
  });
  const winningNumbersSet = new Set(winningNumbers);
  if (winningNumbers.length !== winningNumbersSet.size) {
    throw new Error();
  }
};

export default validateWinningNumbers;
